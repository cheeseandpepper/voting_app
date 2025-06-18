import React, { useState } from "react";

const SignInForm = ({ isVisible, onClose, onSignInSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '', zip_code: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password, 
          zip_code: formData.zip_code 
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Sign in successful:', data.message);
        onSignInSuccess(data.user);
      } else {
        console.log('Sign in failed:', data.message);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        border: "1px solid #000",
        minWidth: "300px"
      }}>
        <h2>Sign in to vote</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #000",
                fontFamily: "inherit",
                borderRadius: "6px"
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #000",
                fontFamily: "inherit",
                borderRadius: "6px"
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Zip code
            </label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleInputChange}
              required
              pattern="[0-9]{5}"
              title="Please enter a valid 5-digit zip code"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #000",
                fontFamily: "inherit",
                borderRadius: "6px"
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                borderRadius: "8px"
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                background: "#fff",
                color: "#000",
                border: "1px solid #000",
                cursor: "pointer",
                fontFamily: "inherit",
                borderRadius: "8px"
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm; 