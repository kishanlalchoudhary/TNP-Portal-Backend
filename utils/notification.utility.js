const prisma = require('./config/prisma');

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

/**
 * Creates a notification and connects it to the specified students
 * Includes retry logic for resilience
 */
const createNotificationWithRetry = async (title, description, studentIds, retryCount = 0) => {
  try {
    // Validate inputs
    if (!title || !description || !Array.isArray(studentIds) || studentIds.length === 0) {
      throw new Error('Invalid notification parameters');
    }
    
    // Create the notification
    const notification = await prisma.notification.create({
      data: {
        title,
        description,
        students: {
          connect: studentIds.map(id => ({ id }))
        }
      }
    });
    
    console.log(`Successfully created notification: ${notification.id}`);
    return notification;
  } catch (error) {
    console.error(`Error creating notification (attempt ${retryCount + 1}):`, error);
    
    // Retry logic
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return createNotificationWithRetry(title, description, studentIds, retryCount + 1);
    } else {
      console.error(`Failed to create notification after ${MAX_RETRIES} attempts`);
      throw error;
    }
  }
};

/**
 * Clean up old notifications to prevent database bloat
 * This can be called periodically
 */
const cleanupOldNotifications = async (olderThanDays = 30) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    
    const result = await prisma.notification.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate
        }
      }
    });
    
    console.log(`Cleaned up ${result.count} old notifications`);
    return result.count;
  } catch (error) {
    console.error('Error cleaning up old notifications:', error);
    throw error;
  }
};

module.exports = {
  createNotificationWithRetry,
  cleanupOldNotifications
};