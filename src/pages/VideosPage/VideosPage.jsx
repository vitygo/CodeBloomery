import React from "react";
import "../PracticePages.css";

export default function VideosPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Video Lessons Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Video lessons will be shown here]</div>
    </div>
  );
}