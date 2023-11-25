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
        borderRadius: "10px",
        padding: "20px",
        border: "none",
        maxWidth: "300px",
        maxHeight: "300px",
        margin: "auto",
      },
    }}
  >
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
  </Modal>
);

export default UnfinishedHabitsReminder;
