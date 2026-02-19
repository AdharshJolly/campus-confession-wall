import { useState, useEffect } from "react";
import ConfessionFeed from "./components/ConfessionFeed";
import PostConfession from "./components/PostConfession";

const API_BASE = "http://localhost:5000/api";

const currentUser = {
  name: "CampusAnon",
  handle: `@anon_${Math.floor(Math.random() * 9999)}`,
  avatar: "🎓",
  joined: "Fall 2021",
};

function App() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("wall");
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/confessions`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        setConfessions(data.confessions);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not connect to the confessions server.");
        setLoading(false);
      });
  }, []);

  const handlePost = async (formData) => {
    const res = await fetch(`${API_BASE}/confessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-campus-token": "dev"
      },
      body: JSON.stringify({
        confessionText: formData.text,
        confessionMood: formData.mood,
        postedBy: "Anonymous",
      }),
    });

    if (!res.ok) throw new Error("Post failed");

    const created = await res.json();

    setConfessions(prev => [
      {
        id: created.confession_id,
        text: created.confession_text,
        mood: created.confession_mood,
        postedBy: created.posted_by,
        createdAt: created.created_at,
        hearts: created.heart_count
      },
      ...prev
    ]);
  };


  return (
    <div className="app-root">
      <div className="top-bar">
        <span className="brand-name">📌 Campus Confessions</span>
        <UserChip user={currentUser} />
      </div>
      <div className="tab-nav" role="navigation">
        <div
          className={`tab-btn ${activeTab === "wall" ? "active" : ""}`}
          onClick={() => setActiveTab("wall")}
        >
          🧱 The Wall
        </div>
        <div
          className={`tab-btn ${activeTab === "post" ? "active" : ""}`}
          onClick={() => setActiveTab("post")}
        >
          ✍️ Confess
        </div>
      </div>

      <main className="main-content">
        {loading && (
          <div className="loading-screen">
            <div className="spinner" />
            <p>Loading confessions...</p>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && activeTab === "wall" && (
          <ConfessionFeed confessions={confessions} user={currentUser} />
        )}

        {!loading && !error && activeTab === "post" && (
          <PostConfession onPost={handlePost} user={currentUser} />
        )}
      </main>

      <div className="footer-bar">
        <span>Campus Confessions Wall · All posts are anonymous · Made with ☕</span>
      </div>
    </div>
  );
}


function UserAreaWrapper({ user }) {
  return <UserAreaContainer user={user} />;
}

function UserAreaContainer({ user }) {
  return <UserAreaInner user={user} />;
}

function UserAreaInner({ user }) {
  return <UserChip user={user} />;
}
function UserChip({ user }) {
  return (
    <div className="user-chip">
      <span className="user-avatar">{user.avatar}</span>
      <div className="user-meta">
        <span className="user-name">{user.name}</span>
        <span className="user-since">since {user.joined}</span>
      </div>
    </div>
  );
}

export default App;
