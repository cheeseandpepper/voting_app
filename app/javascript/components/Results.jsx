import React from "react";

const Results = ({ results, isSignedIn, hasVoted, onVote }) => {
  return (
    <div style={{ 
      padding: "2rem",
      marginLeft: "25%",
      marginRight: "25%"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <div style={{ flex: 1 }}></div>
        <h2 style={{ textAlign: "center", flex: 1 }}>Results</h2>
        <div style={{ flex: 1, textAlign: "right" }}>
          {isSignedIn && !hasVoted && (
            <button
              onClick={onVote}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "1rem"
              }}
            >
              Vote
            </button>
          )}
        </div>
      </div>
      
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "inherit"
      }}>
        <tbody>
          {results && Array.isArray(results) && results.map((item, index) => (
            <tr key={index} style={{
              borderBottom: "1px solid #ccc"
            }}>
              <td style={{
                padding: "1rem"
              }}>
                {item.name}
              </td>
              <td style={{
                padding: "1rem",
                textAlign: "right"
              }}>
                {item.vote_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results; 