import * as NotesController from "../controllers/notes";
import express from "express";

const router = express.Router();

router.get("/", NotesController.getNotes); // not app.get() here

router.get("/:noteId", NotesController.getNote);     // get a single note

router.post("/", NotesController.createNote);

export default router;
