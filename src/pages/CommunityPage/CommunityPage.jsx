import React from "react";
import "../PracticePages.css";

export default function CommunityPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Community Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Community forum will be here]</div>
    </div>
  );
}