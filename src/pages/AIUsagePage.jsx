import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUserGraduate, faLightbulb, faBrain, faTools, faPalette } from "@fortawesome/free-solid-svg-icons";
import "../styles/AIUsagePage.css";

const AIUsagePage = () => {
  // State to track what has been added to the student
  const [studentSize, setStudentSize] = useState(100); // Start with a small size
  const [knowledgeAdded, setKnowledgeAdded] = useState(false);
  const [thinkingAdded, setThinkingAdded] = useState(false);
  const [problemSolvingAdded, setProblemSolvingAdded] = useState(false);
  const [creativityAdded, setCreativityAdded] = useState(false);
  const [aiAdded, setAIAdded] = useState(false);

  const growStudent = () => {
    setStudentSize(studentSize + 50);
  };

  const handleAspectClick = (aspect) => {
    if (aspect === "knowledge" && !knowledgeAdded) {
      setKnowledgeAdded(true);
      growStudent();
    } else if (aspect === "thinking" && !thinkingAdded) {
      setThinkingAdded(true);
      growStudent();
    } else if (aspect === "problemSolving" && !problemSolvingAdded) {
      setProblemSolvingAdded(true);
      growStudent();
    } else if (aspect === "creativity" && !creativityAdded) {
      setCreativityAdded(true);
      growStudent();
    }
  };

  const handleAIAddition = () => {
    if (!aiAdded) {
      setAIAdded(true);
      growStudent(); // Add AI to the student and grow more
    }
  };

  return (
    <div className="ai-usage-page animated-headline">
      <h1>AI in Our Curriculum</h1>

      <div className="icons-container">
        {/* Student Icon */}
        <div
          className="student-icon"
          style={{
            width: `${studentSize}px`,
            height: `${studentSize}px`,
            transition: "all 0.5s ease",
          }}
        >
          <FontAwesomeIcon icon={faUserGraduate} size="4x" />
          <div className="aspects">
            {knowledgeAdded && <p>Knowledge</p>}
            {thinkingAdded && <p>Critical Thinking</p>}
            {problemSolvingAdded && <p>Problem Solving</p>}
            {creativityAdded && <p>Creativity</p>}
            {aiAdded && <p>AI Integrated</p>}
          </div>
        </div>

        {/* AI Icon */}
        <div className="ai-icon" onClick={handleAIAddition}>
          <FontAwesomeIcon icon={faRobot} size="5x" />
        </div>
      </div>

      {/* Buttons to add aspects */}
      <div className="buttons-container">
        <button onClick={() => handleAspectClick("knowledge")}>Fundamental Knowledge</button>
        <button onClick={() => handleAspectClick("thinking")}>Critical Thinking</button>
        <button onClick={() => handleAspectClick("problemSolving")}>Problem Solving</button>
        <button onClick={() => handleAspectClick("creativity")}>Creativity</button>
      </div>
    </div>
  );
};

export default AIUsagePage;
