export default function Score({ score, paused, gameOver }) {
  return (
    <>
      <h3>Score: {score}</h3>
      {paused && !gameOver && <h3>⏸️ Paused</h3>}
      {gameOver && <h2>❌ Game Over</h2>}
    </>
  );
}
