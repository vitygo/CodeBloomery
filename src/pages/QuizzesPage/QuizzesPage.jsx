import React from "react";
import "../PracticePages.css";

export default function QuizzesPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Quizzes Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Quiz content placeholder]</div>
    </div>
  );
}