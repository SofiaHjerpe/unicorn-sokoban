import { useState } from 'react';
import { Link } from 'react-router-dom';
import selectButton from '/src/assets/images/select-button.png';

const SettingsPage = () => {
  let soundStatus = '';
  let soundStorage = localStorage.getItem('Muted');
  let defaultSoundStatusIsMuted = false;

  if (soundStorage === null) {
    defaultSoundStatusIsMuted = false;
    soundStatus = 'Mute';
  } else {
    defaultSoundStatusIsMuted = Boolean(soundStorage);
    if (soundStorage == 'false') {
      soundStatus = 'Mute';
    } else {
      soundStatus = 'Unmute';
    }
  }

  const [isMuted, setIsMuted] = useState(defaultSoundStatusIsMuted);

  function handleMusic() {
    if (isMuted == true && soundStatus == 'Unmute') {
      localStorage.setItem('Muted', 'false');
    } else {
      localStorage.setItem('Muted', 'true');
    }
    setIsMuted(!isMuted);
  }

  return (
    <div id="settingsDiv">
      <h1>SETTINGS</h1>
      <div>
        <span className="soundSettingsTitle">Sound settings </span>

        <button
          id="soundButton"
          onClick={handleMusic}
          className={soundStatus == 'Mute' ? 'soundButtonOff' : 'soundButtonOn'}>
          {soundStatus}
        </button>
      </div>

      <Link to="/levels">
        <img src={selectButton} id="selectButtonInSettingPage" />
      </Link>
    </div>
  );
};

export default SettingsPage;
