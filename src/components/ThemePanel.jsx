import { Palette } from 'lucide-react'

const ThemePanel = ({ themes, selectedTheme, dynamicTheme, onThemeChange, onDynamicChange, onClose }) => (
  <div className="theme-popover-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="theme-panel" role="dialog" aria-modal="true" aria-labelledby="theme-heading" onMouseDown={event => event.stopPropagation()}>
      <div className="theme-panel-heading">
        <div>
          <p className="eyebrow">Appearance</p>
          <h2 id="theme-heading"><Palette size={22} aria-hidden="true" /> Theme</h2>
        </div>
      </div>

      <label className="settings-toggle-control theme-dynamic-toggle">
        <span>Dynamic theme</span>
        <input type="checkbox" checked={dynamicTheme} onChange={event => onDynamicChange(event.target.checked)} />
      </label>
      <p className="settings-help">Match the theme accent to the active session color.</p>

      <p className="settings-label theme-list-label">Static themes</p>
      <div className="theme-list">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            className={`theme-option ${selectedTheme === key && !dynamicTheme ? 'is-selected' : ''}`}
            key={key}
            type="button"
            onClick={() => onThemeChange(key)}
          >
            <span className="theme-swatches" aria-hidden="true">
              <span style={{ backgroundColor: theme.primary }} />
              <span style={{ backgroundColor: theme.secondary }} />
              <span style={{ backgroundColor: theme.highlight }} />
            </span>
            <span>
              <strong>{theme.label}</strong>
              <small>{selectedTheme === key && !dynamicTheme ? 'Selected' : 'Use theme'}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  </div>
)

export default ThemePanel
