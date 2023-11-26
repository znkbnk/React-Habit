import React from "react";
import Modal from "react-modal";

const UnfinishedHabitsReminder = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel='Unfinished Habits Reminder'
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "444",
      },
      content: {
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        maxWidth: "400px",
        maxHeight: "300px",
        margin: "auto",
        border: "8px solid transparent",
        borderImage:
          "url(https://static3.bigstockphoto.com/0/3/2/large2/230147878.jpg) 50",
      },
    }}
  >
    <div className='modal-form'>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "0 0 10px", color: "#333" }}>Unfinished Habits</h2>
        <p style={{ margin: "0 0 20px", color: "#555" }}>
          Don't forget to check them off and make progress towards your goals!
        </p>
        <button
          style={{
            padding: "8px 16px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
    <style>
      {`
        .modal-form {
          position: relative;
          padding: 20px;
          z-index: 1;
          margin-bottom: 20px;
        }

        .modal-form::before,
        .modal-form::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid #111;
          z-index: -1;
        }

        .modal-form::before {
          transform: rotate(1deg);
          transform-origin: left;
        }

        .modal-form::after {
          transform: rotate(-1deg);
          transform-origin: right;
        }
      `}
    </style>
  </Modal>
);

export default UnfinishedHabitsReminder;
