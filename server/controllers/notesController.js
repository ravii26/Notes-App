import Note from "../models/notes.js";
import { validateNote } from "../utils/validations.js";

const getNotes = async (req, res) => {
  try {
    const user = req.params.user;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    let notes;
    let totalNotes;

    if (user.isAdmin) {
      notes = await Note.find()
        .populate("category")
        .skip(skip)
        .limit(Number(limit));

      totalNotes = await Note.countDocuments({});
    } else {
      notes = await Note.find({ user: user._id })
        .populate("category")
        .skip(skip)
        .limit(Number(limit));
      totalNotes = await Note.countDocuments({ user: user._id });
    }

    if (!notes) return res.status(404).send({ message: "Notes not found" });

    res.status(200).send({
      notes,
      totalNotes,
      totalPages: Math.ceil(totalNotes / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const createNote = async (req, res) => {
  try {
    const user = req.body.user;
    const { title, description, category } = req.body;

    const { error } = validateNote({ title, description });
    if (error) {
      console.log(error);
      return res.status(400).send({ message: error.details[0].message });
    }
    let note = await Note.create({
      title,
      description,
      user: user._id,
      category,
    });

    note = await Note.findOne({ _id: note._id }).populate("category");

    res.status(201).send({ message: "Note created successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "There is problem in server" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOneAndDelete({ _id: noteId });
    if (!note) return res.status(404).send({ message: "Note not found" });

    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getNote = async (req, res) => {
  try {
    const { noteId } = req.body;

    const note = await Note.findOne({ _id: noteId });

    if (!note) return res.status(404).send({ message: "Note not found" });

    res.status(201).send({ note });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, description } = req.body;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(403).json({ message: "Note not found" });
    }

    note.title = title;
    note.description = description;
    note.updatedAt = Date.now();
    await note.save();

    return res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating note" });
  }
};

const searchNotes = async (req, res) => {
  try {
    const user = req.body.user;

    const searchText = req.body.searchText;
    let notes;
    if (user.isAdmin) {
      notes = await Note.find({
        $or: [
          { title: { $regex: searchText, $options: "i" } },
          { description: { $regex: searchText, $options: "i" } },
        ],
      });
    } else {
      notes = await Note.find({
        user: user._id,
        $or: [
          { title: { $regex: searchText, $options: "i" } },
          { description: { $regex: searchText, $options: "i" } },
        ],
      });
    }

    if (!notes) return res.status(404).send({ message: "Notes not found" });

    res.status(200).send({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getNotesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const user = req.body.user;
    let notes;

    if (user.isAdmin) {
      notes = await Note.find({ category: categoryId }).populate("category");
    } else {
      notes = await Note.find({
        category: categoryId,
        user: user._id,
      }).populate("category");
    }
    if (!notes) return res.status(404).send({ message: "Notes not found" });

    res.status(200).send({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export { getNotes, createNote, deleteNote, getNote, updateNote, searchNotes, getNotesByCategory };
