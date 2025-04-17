import axios from "axios";
import { useEffect, useState } from "react";
import "../Component/ApplyLeave.css"; // Your existing CSS

function ApplyLeave() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);

  // Fetch leave requests
  const fetchLeaveRequests = () => {
    axios
      .get("http://127.0.0.1:8000/admin/fetchLeave")
      .then((res) => {
        const updatedData = res.data.map((leave) => ({
          ...leave,
          showDocument: false,
        }));
        setLeaveRequests(updatedData);
      })
      .catch((err) => {
        console.error("Error fetching leave requests:", err);
        alert("There was an error fetching leave requests.");
      });
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleStatusChange = (leaveId, status) => {
    if (!leaveId) return;

    axios
      .patch(`http://127.0.0.1:8000/admin/updateStatus/${leaveId}`, { status })
      .then((res) => {
        setLeaveRequests((prev) =>
          prev.map((leave) =>
            leave._id === leaveId ? { ...leave, status } : leave
          )
        );
      })
      .catch((err) => {
        console.error("Error updating status:", err.response?.data || err);
        alert("There was an error updating the leave status.");
      });
  };

  const showDocumentModal = (leave) => {
    if (!leave.document) return;

    const cleanedUrl = leave.document.replace(/\\/g, "/");
    const fullUrl = `http://localhost:8000/${cleanedUrl}`;
    setSelectedDocumentUrl(fullUrl);
  };

  const closeModal = () => setSelectedDocumentUrl(null);

  const renderDocumentModal = () => {
    if (!selectedDocumentUrl) return null;

    const fileExtension = selectedDocumentUrl.split(".").pop().toLowerCase();

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-modal" onClick={closeModal}>
            &times;
          </button>

          {["jpg", "jpeg", "png"].includes(fileExtension) ? (
            <img
              src={selectedDocumentUrl}
              alt="Medical Proof"
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
          ) : fileExtension === "pdf" ? (
            <iframe
              src={selectedDocumentUrl}
              width="100%"
              height="500px"
              title="Medical Proof"
            />
          ) : (
            <a href={selectedDocumentUrl} target="_blank" rel="noreferrer">
              Download Document
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="leave-container">
      <h1 className="leaverequest-heading">Leave Requests</h1>
      <div className="leave-grid">
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave, index) => (
            <div key={leave._id} className="leave-card">
              <p><strong>Name:</strong> {leave.name}</p>
              <p><strong>Reason:</strong> {leave.reason}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${leave.status.toLowerCase()}`}>
                  {leave.status}
                </span>
              </p>
              <p><strong>Leave Type:</strong> {leave.leaveType}</p>

              <div className="document-container">
                <strong>Show Document:</strong>{" "}
                {leave.leaveType.toLowerCase() === "ml" && leave.document && (
                  <button
                    className="show-document-button"
                    onClick={() => showDocumentModal(leave)}
                    style={{
                      marginLeft: "10px",
                      padding: "4px 10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Show Document
                  </button>
                )}
              </div>

              <div className="button-group">
                <button
                  className="approve-button"
                  onClick={() => handleStatusChange(leave._id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleStatusChange(leave._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-requests">No leave requests found.</p>
        )}
      </div>

      {renderDocumentModal()}
    </div>
  );
}

export default ApplyLeave;
