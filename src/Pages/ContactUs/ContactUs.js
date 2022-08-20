import Map from "../../Components/Map/Map";
import Title from "../../Components/Title/Title";
import Form from "../../Components/Form/Form";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="container">
      <HelmetProvider>
        <Helmet>
          <title>Multi Media | Contact Us</title>
        </Helmet>
      </HelmetProvider>
      <Title title="CONTACT US" />
      <main className="main">
        <Map />
        <Form />
        <div className="phone-footer">
          Ⓒ Copyright Multi Media. <br />
          All Rights Reserved
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
