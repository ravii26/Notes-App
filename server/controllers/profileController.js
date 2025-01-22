import {User} from "../models/user.js";

const getProfile = async (req, res) => {
  try {
    const user = req.params.user;
    if (Buffer.isBuffer(user.profileImage)) {
      const base64Image = user.profileImage.toString("base64");
      user.profileImage = `data:image/png;base64,${base64Image}`;
    }
    res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const updateProfile = async (req, res) => { 
  try {
    const user = req.body.user;
    
    if (!user) return res.status(404).send({ message: "User not found" });
        const { firstName, lastName, email } = req.body;
      const updateData = { firstName, lastName, email };
    
        if (req.file) {
          updateData.profileImage = req.file.buffer.toString('base64');
      }
      
        const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
          new: true,
        });
        res.json(updatedUser);
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
      }
}

export { getProfile, updateProfile };
