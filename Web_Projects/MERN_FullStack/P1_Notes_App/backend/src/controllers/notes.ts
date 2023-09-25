import { RequestHandler } from "express";
import NoteModel from "../../model/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
    if (!mongoose.isValidObjectId(noteId)) {
      // validate user input
      throw createHttpError(400, "Invalid note id!");
    }

    const note = await NoteModel.findById(noteId).exec(); //! like SpringDataJPA, a Facade to access database

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  // request body type
  title?: string; // this can be optional
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title!");
    }

    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error); // pass to error handler
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string; // optional
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    // validate user input
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id!");
    }

    if (!newTitle) {
      throw createHttpError(400, "Note must have a title!");
    }

    const note = await NoteModel.findById(noteId).exec(); // ! mongoose - just like spring data jpa
    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    note.title = newTitle;
    note.text = newText;

    const updateNote = await note.save(); // ! mongoose - just like spring data jpa
    // NoteModel.findByIdAndUpdate()  // this also works
    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async(req, res, next) => {
  const noteId = req.params.noteId;
  try{
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id!");
    }
    
    const note = await NoteModel.findById(noteId).exec();
    if(!note){
      throw createHttpError(404, "Note not found");
    }

    await note.deleteOne();
    // NoteModel.findByIdAndDelete()  // this also works
    res.sendStatus(204);  // !we are not sending json here, because front end would only need status code

  } catch (error) {
    next(error);
  }
}
