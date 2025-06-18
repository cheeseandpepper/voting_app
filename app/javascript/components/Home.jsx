import React, { useState } from "react";

const Home = ({ results }) => {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', zip_code: '' });

  const handleSignInClick = async () => {
    setShowSignInForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        console.log('Sign in successful');
        setShowSignInForm(false);
        setFormData({ email: '', password: '', zip_code: '' });
        // Handle successful sign in
      } else {
        console.log('Sign in failed');
        // Handle sign in failure
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

  return (
    <div style={{ 
      fontFamily: "'Courier New', Courier, 'Lucida Console', Monaco, 'DejaVu Sans Mono', monospace",
      fontWeight: 300,
      lineHeight: 1.4
    }}>
      <header style={{ 
        background: "#fff", 
        color: "#000", 
        padding: "1rem", 
        borderBottom: "1px solid #000",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1>Voting App</h1>
        <button 
          onClick={handleSignInClick}
          style={{
            padding: "0.5rem 1rem",
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          Sign In
        </button>
      </header>
      
      {showSignInForm && (
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
            <h2>Sign In</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Email:
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
                    fontFamily: "inherit"
                  }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Password:
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
                    fontFamily: "inherit"
                  }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Zip Code:
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
                    fontFamily: "inherit"
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
                    fontFamily: "inherit"
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowSignInForm(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                    cursor: "pointer",
                    fontFamily: "inherit"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <main style={{ padding: "2rem" }}>
        <h2>Results: {results}</h2>
      </main>
    </div>
  );
};

export default Home;
