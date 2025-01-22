import sendNotification from "../services/notificationService.js";

const notificationController = async (req, res) => {
    try {
    //   const user = req.body.user;
    const deviceToken =
      "eyLeoLnR6Bi0gzPBvQ5ScZ:APA91bGXH0eWnWrvUICaGoPnH2UnP-gF8j28MR7vuHYuB-9dGb367C0ZAsxTYQuBfQiIOkhkGdmA-zZ1WhOBLWdmGFBY4L9J2HmQs0NwohPIpXzCkPRb06I";
    const title = "New SignUp Alert";
    const body = `New User has signed up`;
    const response = await sendNotification(deviceToken, title, body);
    if (!response) {
      return res.status(500).json({ message: "Failed to send notification" });
        }
        console.log(response)
    res.status(200).json({ message: "Notification sent successfully", response });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

export { notificationController };
