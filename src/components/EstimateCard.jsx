import React from "react";
import "./EstimateCard.css";

const EstimateCard = ({ estimate }) => {
  return (
    <div className="estimate-card">
      <h3>AI Analysis</h3>

      <p>
        <strong>Category:</strong> {estimate.category}
      </p>

      <p>
        <strong>Complexity:</strong> {estimate.complexity}
      </p>

      <p>
        <strong>Duration:</strong> {estimate.duration}
      </p>

      <p>
        <strong>Price Range:</strong> {estimate.priceRange}
      </p>
    </div>
  );
};

export default EstimateCard;