const fs = require('fs');
const path = require('path');

// Simple logger to keep track of notification job runs
const logNotificationJob = (message) => {
  const logDir = path.join(__dirname, 'logs');
  
  // Create logs directory if it doesn't exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  
  const logFile = path.join(logDir, 'notification-jobs.log');
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  
  fs.appendFileSync(logFile, logMessage);
};

// Check if notifications are being sent
const checkNotificationHealth = () => {
  const logFile = path.join(__dirname, 'logs', 'notification-jobs.log');
  
  if (!fs.existsSync(logFile)) {
    return {
      status: 'unknown',
      message: 'No notification job logs found'
    };
  }
  
  const logs = fs.readFileSync(logFile, 'utf8').split('\n').filter(Boolean);
  
  if (logs.length === 0) {
    return {
      status: 'warning',
      message: 'No notification job runs recorded'
    };
  }
  
  const lastLogTimestamp = logs[logs.length - 1].split(' - ')[0];
  const lastRunTime = new Date(lastLogTimestamp);
  const now = new Date();
  const hoursSinceLastRun = (now - lastRunTime) / (1000 * 60 * 60);
  
  if (hoursSinceLastRun > 7) { // Allow 1 hour leeway for 6-hour schedule
    return {
      status: 'error',
      message: `Last notification job ran ${hoursSinceLastRun.toFixed(1)} hours ago`
    };
  }
  
  return {
    status: 'healthy',
    message: `Last notification job ran ${hoursSinceLastRun.toFixed(1)} hours ago`
  };
};

module.exports = {
  logNotificationJob,
  checkNotificationHealth
};