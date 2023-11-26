import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactUsForm = ({
  onClose,
  onContactSubmit,
  setIsContactFormVisible,
  setShowHabitForm,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleContactSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      name,
      email,
      text,
    };

    // Call the function to send the email using EmailJS
    sendEmail(formData);

    // Call the onContactSubmit callback if needed
    if (onContactSubmit) {
      onContactSubmit(formData);
    }

    onClose();
  };

  const sendEmail = (formData) => {
    const templateParams = {
      to_email: formData.email, // Use the email entered by the user
      subject: "Contact Form Submission",
      message: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.text}`,
    };

    emailjs
      .send(
        "service_1n4gsgx",
        "template_mgjx1fd",
        templateParams,
        "u4-0CXt6mlWQViI6d"
      )
      .then((response) => {
        console.log("Email sent:", response);
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error("Email error:", error);
        // Handle error, e.g., show an error message to the user
      });
  };

  const handleCloseClick = () => {
    setIsContactFormVisible(false);
     setShowHabitForm(true);
     
    onClose();
  };

  

  return (
    <div className='habit-form'>
      <div className='contact-us-form'>
        <h2>Contact Us</h2>
        <form onSubmit={handleContactSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <div>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <div>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor='text'>Message</label>
            <div>
              <textarea
                id='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                placeholder='Enter the message'
              />
            </div>
          </div>

          <div className='button-container'>
            <button type='submit' className='form-button'>
              Submit
            </button>
            <button onClick={handleCloseClick} className='form-button'>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
