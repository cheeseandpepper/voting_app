import React, { useState } from "react";

const VoteForm = ({ isVisible, onClose, onVoteSuccess, candidates }) => {
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCandidate) {
      alert('Please select a candidate to vote for.');
      return;
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({ candidate_id: selectedCandidate })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Vote successful:', data.message);
        alert(data.message);
        setSelectedCandidate('');
        onVoteSuccess();
      } else {
        console.log('Vote failed:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Vote error:', error);
      alert('An error occurred while voting. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setSelectedCandidate(e.target.value);
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
        <h2>Cast Your Vote</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Select a candidate:
            </label>
            <select
              name="candidate"
              value={selectedCandidate}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #000",
                fontFamily: "inherit"
              }}
            >
              <option value="">Choose a candidate...</option>
              {candidates && candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
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
              Submit Vote
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
                fontFamily: "inherit"
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

export default VoteForm; 