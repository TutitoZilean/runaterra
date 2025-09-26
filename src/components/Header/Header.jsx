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
      <div className="header-rules">
        <a onClick={() => handleButtonClick()} className="header-rules-button">Reglas</a>
      </div>
      <div className="header-reset">
        <a onClick={() => handleButtonClick()} className="header-reset-button">Resetear</a>
      </div>
    </div>
  );
}

export default Header;