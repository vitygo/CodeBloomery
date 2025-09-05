import React from "react";
import "../PracticePages.css";
export default function ExercisesPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Exercises Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Exercises will appear here]</div>
    </div>
  );
}