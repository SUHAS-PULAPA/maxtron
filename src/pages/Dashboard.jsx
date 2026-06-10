import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "./Dashboard.css";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setBookings(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();

    const channel = supabase
      .channel("bookings-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    const handleBookingUpdated = () => {
      fetchBookings();
    };

    window.addEventListener("booking:updated", handleBookingUpdated);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("booking:updated", handleBookingUpdated);
    };
  }, []);

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (!error) {
      fetchBookings();
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Marco Dashboard</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Complexity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading bookings...</td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="5">No bookings yet.</td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.category || "Pending AI"}</td>
                  <td>{b.complexity || "-"}</td>
                  <td>{b.status}</td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => updateStatus(b.id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => updateStatus(b.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;