import { useState } from "react";

function ConfessionFeed({ confessions, user }) {
  if (!confessions || confessions.length === 0) {
    return (
      <div className="empty-wall">
        <span className="empty-icon">🫥</span>
        <span className="empty-text">No confessions yet. Be the first to confess.</span>
      </div>
    );
  }

  return (
    <div className="confession-feed" aria-label="Confession wall">
      <div className="feed-header">
        <span className="feed-title">Recent Confessions</span>
        <span className="feed-count">{confessions.length} posts</span>
      </div>
      {confessions.map((confession) => (
        <ConfessionCard key={confession.id} confession={confession} user={user} />
      ))}
    </div>
  );
}

function ConfessionCard({ confession, user }) {
  const [hearts, setHearts] = useState(confession.hearts ?? 0);

  const timeAgo = (dateStr) => {
    if (!dateStr) return "some time ago";
    const diff = Date.now() - new Date(dateStr).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "just now";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const handleHeart = async () => {
    const res = await fetch(
      `http://localhost:5000/api/confessions/${confession.id}/heart`,
      { method: "POST" }
    );

    const data = await res.json();
    setHearts(data.hearts);
  };

  return (
    <div className="confession-card">
      <div className="card-top">
        <span className="mood-badge">{confession.mood ?? "💬"}</span>
        <span className="card-time">{timeAgo(confession.createdAt)}</span>
      </div>

      <span className="card-text">
        {confession.text ?? "[ failed to load ]"}
      </span>

      <div className="card-footer">
        <span className="posted-by">🎭 {confession.postedBy}</span>

        <div className="heart-btn" onClick={handleHeart}>
          ❤️ {hearts}
        </div>
      </div>
    </div>
  );
}


export default ConfessionFeed;
