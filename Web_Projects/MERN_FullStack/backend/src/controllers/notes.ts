import { RequestHandler } from "express";
import NoteModel from "../../model/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("blah!"); // simulate an error
    const notes = await NoteModel.find().exec(); // db query
    res.status(200).json(notes);
  } catch (error) {
    next(error); // forward to the next middleware
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await NoteModel.findById(noteId).exec();       //! like SpringDataJPA, a Facade to access database 
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error); // pass to error handler
  }
};
