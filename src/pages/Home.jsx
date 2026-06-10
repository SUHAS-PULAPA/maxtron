import React from "react";
import Navbar from "../components/Navbar";
import BookingForm from "../components/BookingForm";

const Home = () => {
  return (
    <>
      <Navbar />

      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "#eef4ff",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "15px",
            color: "#1e3a8a",
          }}
        >
          Reliable Handyman Services
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "18px",
          }}
        >
          Get quick estimates and request service online.
        </p>
      </section>

      <BookingForm />
    </>
  );
};

export default Home;