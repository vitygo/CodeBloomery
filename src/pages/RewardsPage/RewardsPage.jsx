import React from "react";
import "../PracticePages.css";

export default function RewardsPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Rewards Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Badges and rewards will appear here]</div>
    </div>
  );
}