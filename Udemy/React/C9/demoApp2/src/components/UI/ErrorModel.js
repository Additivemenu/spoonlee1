import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Card from "./Card";
import Button from "./Button";

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

const Backdrop = (props) => {
  return (
    <StyledBackdrop
      className="backdrop"
      onClick={props.onConfirm}
    ></StyledBackdrop>
  );
};

const StyledModal = styled(Card)`
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  overflow: hidden;

  & .header {
    background: #4f005f;
    padding: 1rem;
    & h2 {
      margin: 0;
      color: white;
    }
  }

  & .content {
    padding: 1rem;
  }

  & .actions {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;

const ModalOverlay = (props) => {
  return (
    <StyledModal>
      <header className="header">
        <h2>{props.title}</h2>
      </header>

      <div className="content">
        <p>{props.message}</p>
      </div>

      <footer className="actions">
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </StyledModal>
  );
};

const ErrorModel = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root") // the other side of portal
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModel;
