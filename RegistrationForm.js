import React, { useState } from "react";

const RegistrationForm = ({ onClose, setShowHabitForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // State to control form visibility
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the registration logic here (front-end only).
    // For example, you can validate the form data and display messages.
  };

  const handleCloseClick = () => {
    setIsFormVisible(false);
    setShowHabitForm(true); // Hide the form
    onClose(); // Call the onClose function if needed
  };

  return (
    <div className='registration-modal habit-form'>
      <div className='registration-content'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username:</label>
            <div>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <div>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <div>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor='password'>Re-Password:</label>
            <div>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='button-container'>
            <button type='submit' className='form-button'>
              Register
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

export default RegistrationForm;
