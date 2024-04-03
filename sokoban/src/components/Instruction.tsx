import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Instruction.css";
import boxImage from "../assets/images/box.jpg";
import playerImage from "../assets/images/Miner.gif";
import wallImage from "../assets/images/wall.webp";
import goalImage from "../assets/images/target.png";

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

        <p>
          Classic puzzles are the standard Sokoban puzzles. These puzzles are
          marked with a Box (&nbsp;
          <img  className="no-margin-right" src={boxImage} alt="Classic Puzzle" width="16" height="16" />
          &nbsp;)&nbsp; next to the puzzle name. The goal of the puzzle is to
          push all of the boxes onto the goals. Listed below are the specific
          rules to solve a Classic puzzle:
        </p>
        <ul>
          <li>Only one box can be pushed at a time.</li>
          <li>A box cannot be pulled.</li>
          <li>The player cannot walk through boxes or walls.</li>
          <li>The puzzle is solved when all boxes are on the goals.</li>
        </ul>
        <p>We have 3 levels.</p>
        <h3>Player</h3>
        <img src={playerImage} alt="Classic Puzzle" height="50" />
        <p>
          You are in control of the Player. The Player can move up, down, left
          and right by using the arrow keys on the keyboard.
        </p>
        <h3>Wall</h3>
        <img src={wallImage} alt="Classic Puzzle" width="50" height="50" />
        <p>
          Walls surround a Sokoban puzzle and the Player cannot walk through
          them. Walls make up the layout of the puzzle.
        </p>
        <h3>Box/Goal</h3>
        <img src={boxImage} alt="Classic Puzzle" width="50" height="50" />
        <img src={goalImage} alt="Classic Puzzle" width="50" height="50" />
        <p>
          Boxes can be pushed by the Player. Boxes must be placed on all the
          Goals in the puzzle.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
      <Outlet />
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
