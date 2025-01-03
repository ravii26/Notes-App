const getDevices = async (req, res) => {
  try {
    const user = req.params.user;
    res.status(200).send({ devices: user.devices });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const removeDevice = async (req, res) => {
  try {
    let deviceId;
    let user;
    if (req.method === "POST") {
      deviceId = req.body.deviceId;
      user = req.body.user;
    } else {
      deviceId = req.query.deviceId;
      user = req.params.user;
    }
    
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
