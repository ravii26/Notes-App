import admin from '../utils/firebase.js';

const sendNotification = async (deviceToken, title, body) => {
  try {
    const payload = {
      notification: {
        title: title,
        body: body,
        },
        token: deviceToken
    };

      const response = await admin.messaging().send(payload);
    console.log('Notification sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export default sendNotification;
