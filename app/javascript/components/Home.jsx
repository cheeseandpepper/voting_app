import React, { useState, useEffect } from "react";

const Home = ({ results }) => {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', zip_code: '' });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/auth/status');
      const data = await response.json();
      
      if (data.signed_in) {
        setIsSignedIn(true);
        setCurrentUser(data.user);
      } else {
        setIsSignedIn(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsSignedIn(false);
      setCurrentUser(null);
    }
  };

  const handleSignInClick = async () => {
    setShowSignInForm(true);
  };

  const handleSignOut = async () => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/sessions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Sign out successful:', data.message);
        alert(data.message);
        setIsSignedIn(false);
        setCurrentUser(null);
      } else {
        console.log('Sign out failed:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Sign out error:', error);
      alert('An error occurred during sign out. Please try again.');
    }
  };

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
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Sign in successful:', data.message);
        alert(data.message);
        setShowSignInForm(false);
        setFormData({ email: '', password: '', zip_code: '' });
        setIsSignedIn(true);
        setCurrentUser(data.user);
      } else {
        console.log('Sign in failed:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('An error occurred during sign in. Please try again.');
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
        {isSignedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span>signed in as {currentUser?.email}</span>
            <button 
              onClick={handleSignOut}
              style={{
                padding: "0.5rem 1rem",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
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
        )}
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
