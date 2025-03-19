const express = require('express');
const router = express.Router();
const { checkNotificationHealth } = require('../monitoring');

router.get('/notification', (req, res) => {
  const services = {
    api: { status: 'healthy' },
    database: { status: 'healthy' },
    notifications: checkNotificationHealth()
  };
  
  const overallStatus = Object.values(services).some(s => s.status === 'error') ? 'error' : 'healthy';
  
  res.status(overallStatus === 'error' ? 500 : 200).json({
    status: overallStatus,
    services
  });
});

module.exports = router;