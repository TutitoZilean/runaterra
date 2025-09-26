import videoSrc from "../../videos/earth-globe.webm";
import "./BackgroundVideo.css";

function BackgroundVideo() {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/webm" />
      </video>
    </div>
  );
}

export default BackgroundVideo;