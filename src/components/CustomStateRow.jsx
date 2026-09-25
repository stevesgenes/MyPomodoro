import { GripVertical, Trash2 } from 'lucide-react'

const CustomStateRow = ({
  state,
  index,
  stateCount,
  soundOptions,
  isCurrent,
  isDragged,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => (
  <div
    className={`custom-state-row ${isCurrent ? 'is-current' : ''} ${isDragged ? 'is-dragged' : ''}`}
    draggable
    onDragOver={onDragOver}
    onDragStart={onDragStart}
    onDrop={onDrop}
    onDragEnd={onDragEnd}
  >
    <div className="state-dragger" title="Drag to reorder" aria-label={`Reorder state ${index + 1}`}>
      <GripVertical size={18} aria-hidden="true" />
    </div>
    <div className="state-number">{index + 1}</div>
    <label>
      <span>Title</span>
      <input value={state.title} onChange={event => onUpdate('title', event.target.value)} />
    </label>
    <label className="minutes-field">
      <span>Minutes</span>
      <input min="0" step="0.5" type="number" value={state.minutes} onChange={event => onUpdate('minutes', Math.max(0, Number(event.target.value) || 0))} />
    </label>
    <label className="color-field">
      <span>Color</span>
      <input className="color-input" type="color" value={state.color} onChange={event => onUpdate('color', event.target.value)} />
    </label>
    <label>
      <span>Sound on completion</span>
      <select value={state.sound} onChange={event => onUpdate('sound', event.target.value)}>
        {soundOptions.map(sound => (
          <option key={sound.value} value={sound.value}>{sound.label}</option>
        ))}
        <option value="none">None</option>
      </select>
    </label>
    <label className="goto-field">
      <span>Go to state</span>
      <select value={state.goTo} onChange={event => onUpdate('goTo', Number(event.target.value))}>
        {Array.from({ length: stateCount }, (_, stateIndex) => (
          <option key={stateIndex} value={stateIndex + 1}>State {stateIndex + 1}</option>
        ))}
        <option value={0}>Stop</option>
      </select>
    </label>
    <button className="delete-state-button" type="button" onClick={onDelete} aria-label={`Delete state ${index + 1}`}>
      <Trash2 size={17} aria-hidden="true" />
    </button>
  </div>
)

export default CustomStateRow
