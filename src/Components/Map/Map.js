import "./Map.css";
import React from "react";
const Map = () => {
  return (
    <div className="left">
      <p className="paragraph">
        NEED SOMETHING? GET IN CONTACT WITH THE RIGHT PEOPLE AT MULTI MEDIA TO
        AID YOU IN YOUR DIGITAL ADVENTURE!
      </p>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26499.015108417436!2d35.5091798!3d33.87994609999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slb!4v1653300050448!5m2!1sen!2slb"
          title="bla"
          width="60"
          height="25"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "5%",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
