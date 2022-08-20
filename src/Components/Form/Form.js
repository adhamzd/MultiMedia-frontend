import React, { useState, useRef } from "react";
// import emailjs from "@emailjs/browser";

import "./Form.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const [error, setError] = useState(false);

  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BACK_URL}contact`, {
        method: "Post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, reason, message }),
      });
      setName("");
      setEmail("");
      setReason("");
      setMsg("");
      setSent(true);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <>
      <div className="form">
        <p className="title">WRITE YOUR DETAILS</p>
        <form
          className="contact-us-form"
          ref={form}
          onSubmit={(e) => sendEmail(e)}
        >
          <label className="label">
            NAME: <br />
            <input
              name="name"
              type="text"
              className="name"
              value={name}
              placeholder="For Example: Sam Smith"
              required
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="label">
            EMAIL: <br />
            <input
              name="email"
              type="email"
              className="email"
              value={email}
              placeholder="For Example: SamSmith@Email.com"
              required
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="label">
            REASON FOR CONTACT: <br />
            <input
              name="reason"
              type="text"
              className="reason"
              value={reason}
              placeholder="For Example: Website Development"
              required
              autoComplete="off"
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <label className="label">
            MESSAGE: <br />
            <textarea
              name="message"
              className="msg"
              value={message}
              placeholder="Please Insert Your Message Here"
              required
              onChange={(e) => setMsg(e.target.value)}
            />
          </label>
          <button type="submit" className="submit">
            Send
          </button>
        </form>
        {sent && (
          <div
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              fontSize: "1.5rem",
            }}
          >
            Your email has been sent
          </div>
        )}
        {error && (
          <div
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              fontSize: "1.5rem",
            }}
          >
            Your email is not sent. Try again later.
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
