import Image from "next/image";

export default function Projects() {
  return (
    <div className="my-projects" id="my-projects">
      <h2>Recent projects</h2>
      <div className="my-project-list">
        <div className="project-container" id="project1">
          <Image src="/images/hometown.png" alt="My Hometown" className="project-images" width={400} height={250} />
          <h4>My Hometown</h4>
          <p>
            A simple personal blog website built with HTML, CSS, and JavaScript. Features
            include a home page, about page, and blog post listings.
          </p>
        </div>
        <div className="project-container" id="project2">
          <Image src="/images/travelcon.png" alt="TravelCon" className="project-images" width={400} height={250} />
          <h4>TravelCon</h4>
          <p>
            A travel blog website built with HTML, CSS, and React. Features include my
            favorites places to travel around the world
          </p>
        </div>
        <div className="project-container" id="project3">
          <Image src="/images/measuremate.png" alt="MeasureMate" className="project-images" width={400} height={250} />
          <h4>MeasureMate</h4>
          <p>A website turning your 2D floor plans into 3D model built with Flask and Three.js</p>
        </div>
      </div>
    </div>
  );
}
