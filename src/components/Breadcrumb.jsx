export default function Breadcrumb({ trail, lang, onJump }) {
  if (trail.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Your answers so far">
      <ol>
        {trail.map((step, i) => (
          <li key={i}>
            <button
              type="button"
              className="breadcrumb-step"
              onClick={() => onJump(i)}
              title={lang === "he" ? "חזור לשלב זה" : "Go back to this step"}
            >
              {lang === "he" ? step.optionLabelHe : step.optionLabel}
            </button>
            {i < trail.length - 1 && <span className="breadcrumb-sep">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
