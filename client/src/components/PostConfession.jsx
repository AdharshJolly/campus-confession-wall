import { useState } from "react";

const MOODS = ["😅", "😈", "🥺", "💀", "😂", "😳", "🤡", "💔", "🔥", "👀"];


function PostConfession({ onPost, user }) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("😅");
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setStatus("error");
      return;
    }
    setStatus("posting");
    try {
      await onPost({ text, mood });
      setStatus("success");
      setText("");
      setMood("😅");
    } catch {
      setStatus("error");
    }
  };

  return (
    // ❌ BUG 7 — <div> instead of <form> or <section>
    <form className="post-panel" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

      {/* ❌ BUG 7 — <span> instead of <h2> */}
      <span className="post-title">🤫 Drop Your Confession</span>
      <p className="post-subtitle">Anonymous. Unjudged. Forever on the wall.</p>

      <div className="mood-picker">
        <label className="field-label">Pick your mood</label>
        <div className="mood-grid">
          {MOODS.map((m) => (
            <div
              key={m}
              className={`mood-option ${mood === m ? "selected" : ""}`}
              onClick={() => setMood(m)}
              role="button"
              aria-label={`Mood ${m}`}
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      <div className="text-field-group">
        <label className="field-label" htmlFor="confession-input">
          Your Confession
        </label>
        <textarea
          id="confession-input"
          className="confession-input"
          placeholder="I once ate my roommate's leftovers and blamed it on the RA..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={280}
          rows={4}
        />
        <span className="char-count">{text.length}/280</span>
      </div>

      {/* ❌ BUG 7 — <div> instead of <button> */}
      <button type="submit" className={`post-btn ${status === "posting" ? "posting" : ""}`}>
        {status === "posting" ? "Posting..." : "📌 Pin to Wall"}
      </button>

      {status === "success" && (
        <div className="status-msg success">✅ Your confession is on the wall!</div>
      )}
      {status === "error" && (
        <div className="status-msg error">❌ Something went wrong. Try again.</div>
      )}
    </form>
  );
}

export default PostConfession;
