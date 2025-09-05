import './TheoryPage.css'

import React from "react";
import "../PracticePages.css";

export default function TheoryPage({ topic, sectionId }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Theory Page</h2>
      <p className="page-subtitle">Topic: {topic} | Section: {sectionId}</p>
      <div className="page-placeholder">[Content for Theory will go here]</div>
    </div>
  );
}
