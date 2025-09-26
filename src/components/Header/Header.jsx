import "./Header.css";

function Header() {

  const handleButtonClick = (url) => {
    playButtonSound();
    setTimeout(() => {
      window.location.href = url;
    }, 800);
  };

  return (
    <div className="header-main">
      <img className="header-logo" id="header-logo" alt="Smash Logo" />
      <div className="header-buttons">
        <a onClick={() => handleButtonClick("/home")} className="header-button">Inicio</a>
        <a onClick={() => handleButtonClick("/information")} className="header-button">Información</a>
        <a onClick={() => handleButtonClick("/gallery")} className="header-button">Galería</a>
      </div>
    </div>
  );
}

export default Header;