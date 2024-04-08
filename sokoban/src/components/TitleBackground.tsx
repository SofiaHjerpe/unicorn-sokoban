import './Background.css';

export const TitleBackground = () => {
  return (
    <>
    <div className='bg-wrapper'>
      <div className="bg-overlay"></div>
      <img
        src="./src/assets/images/levelselect.png"
        alt="background-image"
        className="bg-image"
      />
      <h1 className="heading">Level Select</h1>
  </div>
    </>
  );
};
