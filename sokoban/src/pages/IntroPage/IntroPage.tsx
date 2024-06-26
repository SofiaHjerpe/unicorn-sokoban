import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ILevel } from '../../interfaces.ts';
import './IntroPage.css';
import welcomeImage from '../../assets/images/welcome.png';
import backgroundImage from '../../assets/images/sokoban.png';
import startButton from '../../assets/images/start-button.png';
import selectButton from '../../assets/images/select-button.png';
import infoButton from '../../assets/images/info.png';
import settingsButton from '../../assets/images/settings.png';

const IntroPage: React.FC = () => {
  const levels: ILevel = { id: 0, level: 1 };
  return (
    <div className="container">
      <div className="intro-wrapper">
        <img src={backgroundImage} className="center-image" />
        <img src={welcomeImage} className="above-center-image" />
        <div className="left-images">
          <Link to={`/game/${levels.level}`}>
            <img src={startButton} className="start-button" />
          </Link>
          <Link to="/levels">
            <img src={selectButton} className="select-button" />
          </Link>
        </div>
        <div className="right-images">
          <Link to="/info">
            <img src={infoButton} />
          </Link>
          <Link to="/settings">
            <img src={settingsButton} />
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default IntroPage;
