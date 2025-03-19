const cron = require('node-cron');
const prisma = require('./config/prisma');
const { createNotificationWithRetry, cleanupOldNotifications } = require('../utils/notification.utility');
const { logNotificationJob } = require('../monitoring');

// Function to create notifications for all students
const createPeriodicNotifications = async () => {
  logNotificationJob('Starting periodic notification job');
  try {
    console.log('Running scheduled notification job...');
    
    // Get all verified students
    const students = await prisma.student.findMany({
      where: { isVerified: true },
      select: { id: true }
    });
    
    if (students.length === 0) {
      console.log('No verified students found');
      logNotificationJob('No verified students found');
      return;
    }
    
    // Create timestamp for the notification
    const timestamp = new Date().toLocaleString();
    
    // Use our utility with retry logic
    const notification = await createNotificationWithRetry(
      `System Update - ${timestamp}`,
      `This is an automated notification sent at ${timestamp}. Please check for new job postings and important announcements.`,
      students.map(student => student.id)
    );
    
    logNotificationJob(`Successfully sent notification to ${students.length} students. ID: ${notification.id}`);
    
    // Cleanup old notifications (older than 30 days)
    const deletedCount = await cleanupOldNotifications(30);
    logNotificationJob(`Cleaned up ${deletedCount} old notifications`);
    
  } catch (error) {
    console.error('Error in scheduled notification job:', error);
    logNotificationJob(`Error in notification job: ${error.message}`);
  }
};

// Schedule the job to run every 6 hours
const scheduleNotifications = () => {
  // Run immediately when the server starts
  createPeriodicNotifications();
  
  // Then schedule to run every 6 hours
  cron.schedule('0 0 */6 * * *', () => {
    createPeriodicNotifications();
  });
  
  console.log('Notification scheduler initialized. Notifications will be sent every 6 hours.');
  logNotificationJob('Notification scheduler initialized');
};

module.exports = {
  scheduleNotifications,
  createPeriodicNotifications
};