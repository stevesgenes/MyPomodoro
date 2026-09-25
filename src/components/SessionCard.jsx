const SessionCard = ({
  label,
  durationLabel,
  icon: Icon,
  accent,
  isActive,
  onClick,
}) => (
  <button
    className={`session-card ${isActive ? 'is-active' : ''}`}
    style={{ '--card-accent': accent }}
    type="button"
    onClick={onClick}
    aria-pressed={isActive}
  >
    <span className="session-card-topline">
      <span className="session-icon"><Icon size={19} aria-hidden="true" /></span>
      {isActive && <span className="active-label">Active</span>}
    </span>
    <strong>{label}</strong>
    <span className="session-duration">{durationLabel}</span>
  </button>
)

export default SessionCard
