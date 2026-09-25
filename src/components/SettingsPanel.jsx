const SettingsPanel = ({ settings, soundOptions, onChange, onClose }) => (
  <div className="settings-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settings-heading" onMouseDown={event => event.stopPropagation()}>
      <div className="settings-panel-heading">
        <div>
          <p className="eyebrow">Timer defaults</p>
          <h2 id="settings-heading">Settings</h2>
        </div>
      </div>

      <div className="settings-form">
        <p className="settings-label">Time in minutes</p>
        <div className="settings-duration-grid">
          <label>
            <span>Pomodoro</span>
            <input min="0" step="0.5" type="number" value={settings.pomodoro} onChange={event => onChange('pomodoro', event.target.value)} />
          </label>
          <label>
            <span>Short break</span>
            <input min="0" step="0.5" type="number" value={settings.shortBreak} onChange={event => onChange('shortBreak', event.target.value)} />
          </label>
          <label>
            <span>Long break</span>
            <input min="0" step="0.5" type="number" value={settings.longBreak} onChange={event => onChange('longBreak', event.target.value)} />
          </label>
        </div>

        <div className="settings-divider" />
        <p className="settings-label">Automatic break flow</p>
        <label className="settings-toggle-control">
          <span>Enable automatic flow</span>
          <input type="checkbox" checked={settings.automaticFlow} onChange={event => onChange('automaticFlow', event.target.checked)} />
        </label>
        <label className="settings-control">
          <span>Break after each Pomodoro</span>
          <select value={settings.breakType} onChange={event => onChange('breakType', event.target.value)}>
            <option value="short">Short break</option>
            <option value="long">Long break</option>
          </select>
        </label>
        <label className="settings-control">
          <span>Long break after</span>
          <span className="settings-inline-input">
            <input min="1" step="1" type="number" value={settings.longBreakInterval} onChange={event => onChange('longBreakInterval', event.target.value)} />
            <small>Pomodoros</small>
          </span>
        </label>
         <div className="settings-divider" />
        <p className="settings-label settings-sound-heading">Sound on completion</p>
        <div className="settings-sound-grid">
          {[
            ['pomodoroSound', 'Pomodoro'],
            ['shortBreakSound', 'Short break'],
            ['longBreakSound', 'Long break'],
          ].map(([field, label]) => (
            <label className="settings-control" key={field}>
              <span>{label}</span>
              <select value={settings[field]} onChange={event => onChange(field, event.target.value)}>
                {soundOptions.map(sound => <option key={sound.value} value={sound.value}>{sound.label}</option>)}
                <option value="none">None</option>
              </select>
            </label>
          ))}
        </div>
        <p className="settings-help">The long break replaces the selected break when this repetition count is reached.</p>
      </div>
    </section>
  </div>
)

export default SettingsPanel
