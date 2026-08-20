function Footnote({ index, source }) {
  return (
    <li id={`fn-${index}`} className="footnote">
      <span className="footnote-num">[{index}]</span>{" "}
      {source.link ? (
        <a href={source.link} target="_blank" rel="noopener noreferrer">
          {source.citation}
        </a>
      ) : (
        <span>{source.citation}</span>
      )}
      {source.note && <span className="footnote-note"> — {source.note}</span>}
    </li>
  );
}

function FootnoteRef({ index }) {
  return (
    <sup className="footnote-ref">
      <a href={`#fn-${index}`}>[{index}]</a>
    </sup>
  );
}

export default function FinalAnswer({ node, lang, onStartOver, onBack }) {
  const isPlaceholder = !!node.placeholder;
  const sources = node.sources || [];
  const achrona = node.bracha_achrona;

  return (
    <div className="card final-card">
      {isPlaceholder && <div className="placeholder-badge">EXAMPLE / PLACEHOLDER</div>}

      {node.bracha_name ? (
        <>
          <h2 className="bracha-name">
            {lang === "he" ? node.bracha_name_he : node.bracha_name}
          </h2>
          <p className={"bracha-name-alt " + (lang === "he" ? "" : "rtl")}>
            {lang === "he" ? node.bracha_name : node.bracha_name_he}
          </p>

          {(node.bracha_text_en || node.bracha_text_he) && (
            <div className="bracha-text-block">
              <p className="bracha-text-he rtl">{node.bracha_text_he}</p>
              <p className="bracha-text-en">{node.bracha_text_en}</p>
            </div>
          )}

          {node.explanation && (
            <p className={"explanation " + (lang === "he" ? "rtl" : "")}>
              {node.explanation}
              {sources.map((_, i) => (
                <FootnoteRef key={i} index={i + 1} />
              ))}
            </p>
          )}
        </>
      ) : (
        <div className="not-built">
          <h2>{lang === "he" ? node.bracha_name_he : node.bracha_name}</h2>
          <p className={lang === "he" ? "rtl" : ""}>{node.explanation}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="sources-block">
          <h3>{lang === "he" ? "מקורות" : "Sources"}</h3>
          <ol className="footnote-list">
            {sources.map((s, i) => (
              <Footnote key={i} index={i + 1} source={s} />
            ))}
          </ol>
        </div>
      )}

      {achrona && (
        <div className="achrona-block">
          <h3>{lang === "he" ? "ברכה אחרונה" : "Bracha Achrona (after-blessing)"}</h3>
          <p className="achrona-name">
            {lang === "he" ? achrona.name_he : achrona.name}
          </p>
          {(achrona.text_he || achrona.text_en) && (
            <div className="bracha-text-block">
              <p className="bracha-text-he rtl">{achrona.text_he}</p>
              <p className="bracha-text-en">{achrona.text_en}</p>
            </div>
          )}
          {achrona.sources && achrona.sources.length > 0 && (
            <ol className="footnote-list">
              {achrona.sources.map((s, i) => (
                <Footnote key={i} index={i + 1} source={s} />
              ))}
            </ol>
          )}
        </div>
      )}

      <div className="final-actions">
        <button type="button" className="secondary-btn" onClick={onBack}>
          {lang === "he" ? "חזור" : "Back"}
        </button>
        <button type="button" className="primary-btn" onClick={onStartOver}>
          {lang === "he" ? "התחל מחדש" : "Start Over"}
        </button>
      </div>
    </div>
  );
}
