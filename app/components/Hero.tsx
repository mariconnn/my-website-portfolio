import Image from "next/image";

export default function Hero() {
  return (
    <div className="main-section">
      <div className="profile">
        <Image src="/images/profile.jpg" alt="my profile" id="profile-img" width={180} height={180} />
        <div className="my-description">
          <p className="full-name">Maricon Landicho</p>
          <h1>Hello! I&apos;M MARICON</h1>
          <h2>A WEB DEVELOPER |</h2>
          <p>
            Junior Web developer with basic proficiency in HTML5, CSS and Javascript.
            Looking for an opportunity to grow as a developer and learn server-side logic to
            support your team in delivering high-quality websites and digital goals
          </p>
          <div className="contact">
            <p>Check me out on: </p>
            <a href="https://www.facebook.com/maricon.landicho.52" target="_blank" rel="noopener noreferrer">
              <Image src="/images/facebook.png" alt="facebook-icon" className="contact-icon" width={50} height={50} />
            </a>
            <a href="https://www.instagram.com/coiledbrat/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/instagram.png" alt="instagram-icon" className="contact-icon" width={50} height={50} />
            </a>
            <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer">
              <Image src="/images/discord.png" alt="discord-icon" className="contact-icon" width={50} height={50} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
