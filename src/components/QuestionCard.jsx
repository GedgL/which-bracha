export default function QuestionCard({ node, lang, onAnswer }) {
  const question = lang === "he" ? node.question_he : node.question;
  const questionAlt = lang === "he" ? node.question : node.question_he;

  return (
    <div className="card question-card">
      {node.placeholder && <div className="placeholder-badge">EXAMPLE / PLACEHOLDER</div>}
      <h2 className={lang === "he" ? "rtl" : ""}>{question}</h2>
      {questionAlt && <p className={"question-alt " + (lang === "he" ? "" : "rtl")}>{questionAlt}</p>}
      <div className="options">
        {node.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className="option-btn"
            onClick={() => onAnswer(opt)}
          >
            <span className={lang === "he" ? "rtl" : ""}>
              {lang === "he" ? opt.label_he : opt.label}
            </span>
            <span className={"option-alt " + (lang === "he" ? "" : "rtl")}>
              {lang === "he" ? opt.label : opt.label_he}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
