import React, { useState } from "react";
import "./Instruction.css";

interface ModalProps {
  onClose: () => void;
}

const InstructionModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Instruction</h2>
        <p>
          Sokoban (倉庫番, Sōko-ban, lit.'warehouse keeper') is a puzzle video
          game in which the player pushes boxes around in a warehouse, trying to
          get them to storage locations. The game was designed in 1981 by
          Hiroyuki Imabayashi, and first published in December 1982.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const InstructionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="wrapper">
      <button className="instruction-button" onClick={openModal}>
        Instruction
      </button>
      {isOpen && <InstructionModal onClose={closeModal} />}
    </div>
  );
};

export default InstructionButton;
