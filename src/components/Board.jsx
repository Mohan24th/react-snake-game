export default function Board({ rows, cols, snake, food }) {
  return (
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
  );
}
