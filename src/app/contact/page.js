"use client";

import Navbar from "../components/Navbar";
import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";

export default function Contact() {
  const formRef = useRef(null);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  useEffect(() => {
    setIsClient(true); // Set flag when the component is mounted
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ng4k6tl", "template_sisepsf", formRef.current, "bRF8qnmwpqDM2jXCj")
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("Email sending error:", error.text);
          alert("Failed to send message, please try again.");
        }
      );

    e.target.reset();
  };

  // 🚀 Only render on the client to prevent hydration mismatch
  if (!isClient) return null;

  return (
    <>
      <Navbar />
      <div id="chandu">
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-70">
        <h1 className="mb-4 text-white">Contact Us</h1>
        <form ref={formRef} onSubmit={sendEmail} className="contact__form w-100 w-md-50 p-4 border rounded shadow-sm bg-light">
          <div className="mb-3">
            <label htmlFor="emailFrom" className="form-label">Email:</label>
            <input
              type="email"
              name="email_from"
              id="emailFrom"
              className="form-control"
              placeholder="person@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message:</label>
            <textarea
              name="message"
              id="message"
              className="form-control"
              required
              rows="4"
            ></textarea>
          </div>

          <Button
            type="submit"
            variant="contained"
            className="submit__btn btn-primary w-100"
            style={{ marginTop: "15px" }}
          >
            Send
          </Button>
        </form>
      </div>
      </div>
    </>
  );
}
