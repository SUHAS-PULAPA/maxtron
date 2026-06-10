import React, { useState } from "react";
import "./BookingForm.css";
import { supabase } from "../services/supabase";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.length < 10) {
      alert("Please provide more details.");
      return;
    }

    const { error } = await supabase.from("bookings").insert([
      {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        description: formData.description,
        status: "Pending",
      },
    ]);

    if (error) {
      console.error(error);
      alert("Failed to save booking");
    } else {
      window.dispatchEvent(new Event("booking:updated"));
      alert("Booking submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        address: "",
        description: "",
      });
    }
  };

  return (
    <div className="booking-wrapper">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Book a Service</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe your issue..."
          rows="5"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Get Estimate
        </button>
      </form>
    </div>
  );
};

export default BookingForm;