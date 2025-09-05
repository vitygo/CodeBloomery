import React from "react";
import "../PracticePages.css";

export default function FlashcardsPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Flashcards Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Flashcards deck will be here]</div>
    </div>
  );
}