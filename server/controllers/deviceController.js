const getDevices = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ devices: user.devices });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const removeDevice = async (req, res) => {
  try {
    let deviceId;
    if (req.method === "POST") {
      deviceId = req.body.deviceId;
    } else {
      deviceId = req.query.deviceId;
    }
    const user = req.user;
    user.devices = user.devices.filter(
      (device) => device.deviceId !== deviceId
    );
    await user.save();

    if (req.method === "GET") {
      return res
        .status(200)
        .send({
          devices: user.devices,
          message: "Device removed successfully",
        });
    }

    res.status(200).send({ message: "Device removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export { getDevices, removeDevice };
