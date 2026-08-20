import { useState } from "react";
import flowchart from "./data/flowchart.json";
import QuestionCard from "./components/QuestionCard";
import FinalAnswer from "./components/FinalAnswer";
import Breadcrumb from "./components/Breadcrumb";
import "./App.css";

const START_NODE = flowchart._meta.startNode;

function App() {
  const [currentId, setCurrentId] = useState(START_NODE);
  const [trail, setTrail] = useState([]);
  const [lang, setLang] = useState("en");

  const node = flowchart.nodes[currentId];

  function handleAnswer(option) {
    setTrail([
      ...trail,
      {
        fromNodeId: currentId,
        optionLabel: option.label,
        optionLabelHe: option.label_he,
        next: option.next,
      },
    ]);
    setCurrentId(option.next);
  }

  function handleJump(index) {
    const step = trail[index];
    setTrail(trail.slice(0, index));
    setCurrentId(step.fromNodeId);
  }

  function handleBack() {
    if (trail.length === 0) return;
    handleJump(trail.length - 1);
  }

  function handleStartOver() {
    setTrail([]);
    setCurrentId(START_NODE);
  }

  return (
    <div className="app-shell" dir={lang === "he" ? "rtl" : "ltr"}>
      <header className="app-header">
        <h1 onClick={handleStartOver} className="app-title" role="button" tabIndex={0}>
          {lang === "he" ? "איזו ברכה?" : "Which Bracha?"}
        </h1>
        <div className="lang-toggle" role="group" aria-label="Language">
          <button
            type="button"
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={lang === "he" ? "active" : ""}
            onClick={() => setLang("he")}
          >
            עברית
          </button>
        </div>
      </header>

      <Breadcrumb trail={trail} lang={lang} onJump={handleJump} />

      <main className="app-main">
        {node.is_final ? (
          <FinalAnswer
            node={node}
            lang={lang}
            onStartOver={handleStartOver}
            onBack={handleBack}
          />
        ) : (
          <>
            <QuestionCard node={node} lang={lang} onAnswer={handleAnswer} />
            {trail.length > 0 && (
              <button type="button" className="secondary-btn back-link" onClick={handleBack}>
                {lang === "he" ? "‹ חזור" : "‹ Back"}
              </button>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <button type="button" className="text-btn" onClick={handleStartOver}>
          {lang === "he" ? "התחל מחדש" : "Start Over"}
        </button>
      </footer>
    </div>
  );
}

export default App;
