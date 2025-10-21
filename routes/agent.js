const express = require('express');
const router = express.Router();

const agent_controller = require('../controllers/agentController');
const { requiresAuth } = require('express-openid-connect');

router.get(
    '/call',
    requiresAuth(),
    agent_controller.agent_call_get
    );

module.exports = router;
