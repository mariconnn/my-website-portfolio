import Image from "next/image";

export default function WhatIDo() {
  return (
    <div className="what-i-do">
      <h3>What I do?</h3>
      <div className="what-i-do-list">
        <div className="what-i-do-container" id="what-i-do1">
          <Image src="/images/icons8-web-development-48.png" alt="web development" className="what-i-do-images" width={48} height={48} />
          <h5>Web development</h5>
          <p>I build websites using HTML, CSS, React, and Javascript</p>
        </div>
        <div className="what-i-do-container" id="what-i-do2">
          <Image src="/images/icons8-mobile-app-48.png" alt="mobile app development" className="what-i-do-images" width={48} height={48} />
          <h5>Mobile App</h5>
          <p>I built mobile applications using Android Studio</p>
        </div>
        <div className="what-i-do-container" id="what-i-do3">
          <Image src="/images/icons8-ui-ux-design-48.png" alt="ui-ux" className="what-i-do-images" width={48} height={48} />
          <h5>UI/UX design</h5>
          <p>I design both website and mobile app interface using figma</p>
        </div>
      </div>
    </div>
  );
}
