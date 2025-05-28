import React, { useState, useEffect } from 'react';
import './App.css';

const ROWS = 15;
const COLS = 20;
const COLORS = ['#ff4444', '#ff6b6b', '#ff8e8e', '#ffaaaa', '#ffcccc'];

export default function App() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops(prev => {
        const moved = prev
          .map(d => ({ ...d, row: d.row + 1 }))
          .filter(d => d.row - 2 < ROWS);

        if (Math.random() < 0.8) {
          moved.push({
            id: Date.now() + Math.random(),
            col: Math.floor(Math.random() * COLS),
            row: 0,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
          });
        }

        return moved;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="grid">
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const hit = drops.find(
              d => d.col === c && (r === d.row || r === d.row - 1 || r === d.row - 2)
            );
            return (
              <div
                key={`${r}-${c}`}
                className="cell"
                style={{ backgroundColor: hit ? hit.color : '#1a1a1a' }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
