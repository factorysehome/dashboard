import React from "react";

const CustomAlert = ({ message, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
          maxWidth: "400px",
          width: "90%",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#007BFF"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.013 10.013 0 0 0 12 2Zm.001 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1Zm1-5.727V16a1 1 0 0 1-2 0v-3.727a1 1 0 0 1 .554-.894l2.857-1.429a1 1 0 1 1 .895 1.788l-2.306 1.153Z" />
          </svg>
        </div>
        <p style={{ fontSize: "18px", marginBottom: "20px", color: "#333" }}>
          {message}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "10px 25px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#007BFF")
          }
        >
          Close
        </button>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CustomAlert;
