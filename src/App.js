import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const rows = 20;
  const cols = 20;

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  function generateFood() {
    return {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
  }

  function resetGame() {
    setSnake([{ x: 10, y: 10 }]);
    setDirection("RIGHT");
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setPaused(false);
  }

  // 🎮 Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        setPaused((prev) => !prev);
        return;
      }

      setDirection((prev) => {
        if (e.key === "ArrowUp" && prev !== "DOWN") return "UP";
        if (e.key === "ArrowDown" && prev !== "UP") return "DOWN";
        if (e.key === "ArrowLeft" && prev !== "RIGHT") return "LEFT";
        if (e.key === "ArrowRight" && prev !== "LEFT") return "RIGHT";
        return prev;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 🕒 Game loop
  useEffect(() => {
    if (gameOver || paused) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead = head;

        if (direction === "RIGHT") newHead = { x: head.x + 1, y: head.y };
        if (direction === "LEFT") newHead = { x: head.x - 1, y: head.y };
        if (direction === "UP") newHead = { x: head.x, y: head.y - 1 };
        if (direction === "DOWN") newHead = { x: head.x, y: head.y + 1 };

        // ❌ Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= cols ||
          newHead.y < 0 ||
          newHead.y >= rows
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // ❌ Self collision
        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // 🍎 Eat food
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood());
          setScore((prev) => prev + 1);
          return [newHead, ...prevSnake];
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 300);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, paused]);

  return (
    <div className="container">
      <h1>🐍 Snake Game</h1>
      <h3>Score: {score}</h3>

      {paused && !gameOver && <h3>⏸️ Paused</h3>}
      {gameOver && <h2>❌ Game Over</h2>}

      <div
        className="board"
        style={{
          gridTemplateRows: `repeat(${rows}, 20px)`,
          gridTemplateColumns: `repeat(${cols}, 20px)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const x = index % cols;
          const y = Math.floor(index / cols);

          const isSnake = snake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={`cell ${isSnake ? "snake" : isFood ? "food" : ""}`}
            />
          );
        })}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPaused((p) => !p)}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button onClick={resetGame} style={{ marginLeft: "10px" }}>
          Restart
        </button>
      </div>
    </div>
  );
}
