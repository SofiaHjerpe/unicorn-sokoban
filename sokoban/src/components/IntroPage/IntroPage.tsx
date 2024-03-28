import React from 'react';
import './IntroPage.css'; 
import welcomeImage from '../../assets/images/welcome.png';
import backgroundImage from '../../assets/images/sokoban.png';
import startButton from '../../assets/images/start-button.png';
import selectButton from '../../assets/images/select-button.png';
import infoButton from '../../assets/images/info.png';
import settingsButton from '../../assets/images/settings.png';

const IntroPage: React.FC = () => {
  return (
    <div className="container">
      <img src={backgroundImage} className="center-image" />
      <img src={welcomeImage} className="above-center-image" />
      <div className="left-images">
        <img src={startButton} className="start-button" />
        <img src={selectButton} className="select-button" />
      </div>
      <div className="right-images">
        <img src={infoButton} />
        <img src={settingsButton} />
      </div>
    </div>
  );
};

export default IntroPage;