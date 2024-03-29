import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../util/formatDate";

interface NoteProps {
  note: NoteModel;
  className: string; // to allow outside to pass styles
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Update: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "created" + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
