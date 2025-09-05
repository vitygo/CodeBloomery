import React from "react";
import "../PracticePages.css";

export default function ProjectsPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Projects Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Project workspace placeholder]</div>
    </div>
  );
}