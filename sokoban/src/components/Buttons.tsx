import './Buttons.css';
import { Link } from 'react-router-dom';

export const Buttons = () => {
  return (
    <>
      <Link to={'/'} className="level-link">
        <div className="close-btn" />
      </Link>
      <Link to={'/'} className="level-link">
        <div className="arrow-btn" />
      </Link>
    </>
  );
};
