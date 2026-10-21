export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <p className="name-logo">Maricon</p>
      </div>
      <div className="nav-links">
        <a href="#like" className="links">About Me</a>
        <a href="#my-projects" className="links">Projects</a>
        <a href="#contact" className="links">Contact</a>
      </div>
    </div>
  );
}
