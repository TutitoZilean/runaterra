import { useState } from "react";
import logoNormal from '../../img/logo/discord-logo.webp'; // Imagen normal
import logoHover from '../../img/logo/my-discord-logo.webp'; // Imagen hover
import "./Footer.css"

function Footer() {
  const [serverDiscordLogo, setDiscordLogo] = useState(logoNormal);

  const handleMouseEnter = () => {
    setDiscordLogo(logoHover);
  };

  const handleMouseOut = () => {
    setDiscordLogo(logoNormal);
  };

  return (
    <>
      <div className="footer-container">
        <p className="footer-text">Desarrollado por:</p>
        <div className="white-space-footer" /><a className="footer-links" href="https://github.com/jasanchez97" target="_blank" rel="noopener noreferrer">TutitoZilean</a>
        <div className="white-space-footer" />
        <a href="https://discord.gg/YdnrbpP" target="_blank"rel="noopener noreferrer" className="discord-link">
          <img src={serverDiscordLogo} onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut} alt="Unirse al servidor de Discord" className="discord-logo" id="link-discord" />
          </a>
      </div>
    </>
  )
}

export default Footer