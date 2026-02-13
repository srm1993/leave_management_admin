import React from "react";
import './AdminHome.css';
import axios from 'axios';
import { useEffect, useState } from "react";

function AdminHome() {
  const [leaveCounts, setLeaveCounts] = useState({
    Approved: 0,
    pending: 0,
    Rejected: 0
  });

  const calculateStatistics = () => {
    const total = leaveCounts.Approved + leaveCounts.pending + leaveCounts.rejected;
    const approvalRate = total === 0 ? 0 : ((leaveCounts.Approved / total) * 100).toFixed(2);
    const pendingRate = total === 0 ? 0 : ((leaveCounts.pending / total) * 100).toFixed(2);
    
    return {
      totalRequests: total,
      approvalRate,
      pendingRate
    };
  };

  const stats = calculateStatistics();

  useEffect(() => {
    const fetchLeaveCounts = async () => {
      try {
        const res = await axios.get("https://leave-management-backend-6nqt.onrender.com/admin/leaves");
        // console.log(res.data);
        setLeaveCounts(res.data);
      } catch (err) {
        console.error("Failed to fetch leave counts", err);
      }
    };

    fetchLeaveCounts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Leave Summary</h2>
      <div className="leave-stats">
        <div className="stat approved">Approved: {leaveCounts.Approved}</div>
        <div className="stat pending">Pending: {leaveCounts.pending}</div>
        <div className="stat rejected">Rejected: {leaveCounts.Rejected}</div>
      </div>

      <div className="statistics">
        <h3>Statistics</h3>
        <div className="leave-stats">
          <div className="stat approved">Total Requests: {stats.totalRequests}</div>
          <div className="stat pending">Approval Rate: {stats.approvalRate}%</div>
          <div className="stat rejected">Pending Rate: {stats.pendingRate}%</div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
