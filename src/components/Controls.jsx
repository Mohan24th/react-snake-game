export default function Controls({ paused, onPause, onRestart }) {
  return (
    <div className="controls">
      <button className="btn" onClick={onPause}>
        {paused ? "Resume" : "Pause"}
      </button>
      <button className="btn danger" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}
