import React, { useState, useEffect } from "react";
import Results from "./Results";
import SignInForm from "./SignInForm";
import VoteForm from "./VoteForm";

const Home = ({ results: initialResults }) => {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('/results');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resultsData = await response.json();
      setResults(resultsData);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/auth/status');
      const data = await response.json();
      
      if (data.signed_in) {
        setIsSignedIn(true);
        setCurrentUser(data.user);
        setHasVoted(data.has_voted);
      } else {
        setIsSignedIn(false);
        setCurrentUser(null);
        setHasVoted(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsSignedIn(false);
      setCurrentUser(null);
      setHasVoted(false);
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
        setIsSignedIn(false);
        setCurrentUser(null);
        setHasVoted(false);
      } else {
        console.log('Sign out failed:', data.message);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSignInSuccess = (user) => {
    setShowSignInForm(false);
    setIsSignedIn(true);
    setCurrentUser(user);
    checkAuthStatus();
  };

  const handleVote = () => {
    setShowVoteForm(true);
  };

  const handleVoteSuccess = () => {
    setShowVoteForm(false);
    setHasVoted(true);
    fetchResults();
    checkAuthStatus();
  };

  const candidates = results ? results.map((item, index) => ({
    id: index + 1,
    name: item.name
  })) : [];

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
            <span>Welcome, {currentUser?.email}</span>
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
      
      <SignInForm 
        isVisible={showSignInForm}
        onClose={() => setShowSignInForm(false)}
        onSignInSuccess={handleSignInSuccess}
      />

      <VoteForm
        isVisible={showVoteForm}
        onClose={() => setShowVoteForm(false)}
        onVoteSuccess={handleVoteSuccess}
        candidates={candidates}
      />
      
      <main>
        <Results results={results} isSignedIn={isSignedIn} hasVoted={hasVoted} onVote={handleVote} />
      </main>
    </div>
  );
};

export default Home;
