import { useState } from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  let soundStatus = '';
  let soundStorage = localStorage.getItem('Muted');
  let defaultSoundStatusIsMuted = false;

  if (soundStorage === null) {
    defaultSoundStatusIsMuted = false;
    soundStatus = 'Has sound';
  } else {
    defaultSoundStatusIsMuted = Boolean(soundStorage);
    if (soundStorage == 'false') {
      soundStatus = 'Has sound';
    } else {
      soundStatus = 'No sound';
    }
  }

  const [isMuted, setIsMuted] = useState(defaultSoundStatusIsMuted);

  function handleMusic() {
    if (isMuted == true && soundStatus == 'No sound') {
      localStorage.setItem('Muted', 'false');
    } else {
      localStorage.setItem('Muted', 'true');
    }
    setIsMuted(!isMuted);
  }

  return (
    <div id="settingsDiv">
      <div>
        <span className="soundSettingsTitle">Sound settings </span>
        <button id="soundButton" onClick={handleMusic}>
          {soundStatus}
        </button>
      </div>

      <Link to="/">
        <button id="soundButton">Back to main page</button>
      </Link>
    </div>
  );
};

export default SettingsPage;
