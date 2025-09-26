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
      <div className="header-buttons">
        <a onClick={() => handleButtonClick("/gallery")} className="header-button">Galería</a>
      </div>
    </div>
  );
}

export default Header;