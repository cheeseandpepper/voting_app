import React, { useState } from "react";

const VoteForm = ({ isVisible, onClose, onVoteSuccess, candidates }) => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [newCandidateName, setNewCandidateName] = useState('');

  const handleExistingVoteSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCandidate) {
      console.log('Please select a candidate to vote for.');
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
        body: JSON.stringify({ 
          vote: { candidate_id: selectedCandidate }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Vote successful:', data.message);
        setSelectedCandidate('');
        onVoteSuccess();
      } else {
        console.log('Vote failed:', data.message);
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const handleNewVoteSubmit = async (e) => {
    e.preventDefault();
    
    if (!newCandidateName.trim()) {
      console.log('Please enter a candidate name.');
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
        body: JSON.stringify({ 
          vote: { 
            candidate_attributes: { full_name: newCandidateName.trim() }
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Vote successful:', data.message);
        setNewCandidateName('');
        onVoteSuccess();
      } else {
        console.log('Vote failed:', data.message);
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const handleRadioChange = (e) => {
    setSelectedCandidate(e.target.value);
  };

  const handleNewCandidateInputChange = (e) => {
    setNewCandidateName(e.target.value);
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
        minWidth: "400px"
      }}>
        <h2>Cast your vote today!</h2>
        
        {/* Existing Candidates Section */}
        <form onSubmit={handleExistingVoteSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "1rem", fontWeight: "bold" }}>
              Select an existing candidate:
            </label>
            {candidates && candidates.map((candidate) => (
              <div key={candidate.id} style={{ marginBottom: "0.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="candidate"
                    value={candidate.id}
                    checked={selectedCandidate === candidate.id.toString()}
                    onChange={handleRadioChange}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {candidate.name}
                </label>
              </div>
            ))}
          </div>
          
          <div style={{ marginBottom: "2rem" }}>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "1rem",
                borderRadius: "8px"
              }}
            >
              Vote
            </button>
          </div>
        </form>

        {/* Divider */}
        <div style={{ 
          borderTop: "1px solid #ccc", 
          marginBottom: "1.5rem",
          paddingTop: "1rem"
        }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>Or, add a new candidate:</p>
        </div>

        {/* New Candidate Section */}
        <form onSubmit={handleNewVoteSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              name="new_candidate_name"
              value={newCandidateName}
              onChange={handleNewCandidateInputChange}
              placeholder="Enter candidate name"
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
          
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "1rem",
                borderRadius: "8px"
              }}
            >
              Vote
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#fff",
                color: "#000",
                border: "1px solid #000",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "1rem",
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

export default VoteForm; 