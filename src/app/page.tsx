import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";
import {CredentialsMethod, OpenFgaClient} from "@openfga/sdk";
import {FgaCheckResponse, FgaConfig} from "@/lib/schemas"
import {inspectRun, observeOutcome, step} from "agent-inspect";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;
  const docId = 'public-doc';
  let agentExecuted = false;
  let allowed = false;

  // 1. Init fga client
  const fgaConfig = FgaConfig.parse({
      apiUrl: process.env.FGA_API_URL,
      apiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER,
      apiAudience: process.env.FGA_API_AUDIENCE,
      clientId: process.env.FGA_CLIENT_ID,
      clientSecret: process.env.FGA_CLIENT_SECRET,
      storeId: process.env.FGA_STORE_ID,
  })

  const fgaClient = new OpenFgaClient({
        apiUrl: fgaConfig.apiUrl, // required
        storeId: fgaConfig.storeId, // not needed when calling `CreateStore` or `ListStores`
        credentials: {
            method: CredentialsMethod.ClientCredentials,
            config: {
                apiTokenIssuer: fgaConfig.apiTokenIssuer,
                apiAudience: fgaConfig.apiAudience,
                clientId: fgaConfig.clientId,
                clientSecret: fgaConfig.clientSecret,
            }
        }
    });

  // 2. Manually instrument the pipeline
  await inspectRun("agent-call-simulation", async () => {
      // a. pipline steps
      await step("plan", async () => {});
      await step.tool("check-fga", async () => {
          const resp = await fgaClient.check({
              user: `user:${user?.email}`,
              object: `document:${docId}`,
              relation: "viewer",
           });
          ({ allowed } = FgaCheckResponse.parse(resp));
      });

      if(allowed) {
          await step.llm("protected-action", async () => {
              agentExecuted = true;
          });
      }

      // b. observeOutcome() will automatically log the outcome of the step
      await observeOutcome('protectedAction', {
          expectation: allowed ? 'Agent executed' : 'Agent unauthorized',
          status: agentExecuted === (allowed) ? 'passed' : 'failed',
          method: 'custom',
          actual: { agentExecuted },
          evidence: { observer: 'synthetic-agent-flag' },
      });
  }, { traceDir: '.agent-inspect-authz', silent: true });

  return (
      <main className="min-h-screen bg-[#efefef] flex flex-col items-center justify-center gap-4 px-6 py-12">
        <div className="bg-white rounded-[28px] shadow-[0_4px_32px_rgba(0,0,0,0.08)] px-12 py-14 flex flex-col items-center gap-4 w-[360px]">
          {user ? (
              <>
                <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">Your account</h1>
                <div className="w-full h-px bg-gray-100" />
                <Profile />
                <LogoutButton />
              </>
          ) : (
              <>
                <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">Welcome to Sample0</h1>
                <p className="text-[13px] text-gray-400 text-center leading-relaxed -mt-2">
                  Get started by logging in to your account
                </p>
                <div className="h-3" />
                <LoginButton />
              </>
          )}
        </div>
      </main>
  );
}