"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    if (!hasToggled) {
      setShowMessage(true);
      setHasToggled(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={toggleTheme}
        className="bg-[var(--bg-card)] border-2 border-[var(--border-default)] text-[var(--text-primary)] text-lg font-medium rounded-xl px-5 py-3 shadow-md hover:shadow-lg transition-all"
      >
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </button>
      {showMessage && (
        <p className="mt-2 text-[var(--text-secondary)] text-base">
          {isDark
            ? "You're now in dark mode — tap the button again to switch back."
            : "You're back in light mode."}
        </p>
      )}
    </div>
  );
}
