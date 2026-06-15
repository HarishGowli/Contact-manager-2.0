import React, { useEffect, useState } from "react";

const ContactForm = ({ onSubmit, existing, onCancel }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (existing) {
      setName(existing.name || "");
      setPhone(existing.phone || "");
      setEmail(existing.email || "");
    } else {
      setName("");
      setPhone("");
      setEmail("");
    }
  }, [existing]);

  const validateEmail = (emailValue) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (emailValue && !gmailPattern.test(emailValue)) {
      setEmailError("Only Gmail addresses are allowed (example@gmail.com)");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email before submitting
    if (!validateEmail(email)) {
      return;
    }
    
    onSubmit({ name, phone, email });
    if (!existing) {
      setName("");
      setPhone("");
      setEmail("");
      setEmailError("");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          type="text"
          value={name}
          required
          minLength="2"
          maxLength="50"
          pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
          title="Name should contain only letters and single spaces between words"
          placeholder="Enter Name"
          onChange={(e) => {
            let value = e.target.value.replace(/[^A-Za-z ]/g, "");
            value = value.replace(/\s+/g, " ");
            setName(value);
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          required
          placeholder="Enter Phone Number"
          maxLength="10"
          pattern="[0-9]{10}"
          title="Phone number must contain exactly 10 digits"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setPhone(value);
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          maxLength="100"
          placeholder="Enter Email Address"
          pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
          title="Only Gmail addresses are allowed (example@gmail.com)"
          onChange={handleEmailChange}
        />
        {emailError && <div style={{ color: "#ff8a8a", fontSize: "12px", marginTop: "5px" }}>{emailError}</div>}
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {existing ? "Update contact" : "+ Add contact"}
        </button>
        {existing && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;