import React, { useCallback, useEffect, useState } from 'react'
import { Brain, Coffee, ListPlus, Parasol, Pause, Play, RotateCcw } from 'lucide-react'

import Footer from './Footer'
import Header from './Header'

import CircularProgress from '../components/CircularProgress'
import CustomStateRow from '../components/CustomStateRow'
import SessionCard from '../components/SessionCard'
import SettingsPanel from '../components/SettingsPanel'
import ThemePanel from '../components/ThemePanel'

const soundFiles = import.meta.glob('../sounds/*.{mp3,wav,ogg,m4a}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const formatSoundName = (filePath) => filePath
  .split('/').pop()
  .replace(/\.[^/.]+$/, '')
  .replace(/_/g, ' ')
  .replace(/(^|\s)\S/g, letter => letter.toUpperCase())

const soundOptions = Object.entries(soundFiles).map(([filePath, url]) => ({
  label: formatSoundName(filePath),
  value: url,
}))

const blendHex = (foreground, background, foregroundWeight) => {
  const toRgb = color => color.match(/\w\w/g).map(value => parseInt(value, 16))
  const [foregroundRed, foregroundGreen, foregroundBlue] = toRgb(foreground)
  const [backgroundRed, backgroundGreen, backgroundBlue] = toRgb(background)
  const mix = (foregroundChannel, backgroundChannel) => Math.round(
    foregroundChannel * foregroundWeight + backgroundChannel * (1 - foregroundWeight),
  )

  return `#${[mix(foregroundRed, backgroundRed), mix(foregroundGreen, backgroundGreen), mix(foregroundBlue, backgroundBlue)]
    .map(channel => channel.toString(16).padStart(2, '0')).join('')}`
}

const themes = {
  coral: { label: 'Coral', primary: '#ff795f', secondary: '#7ed7c1', highlight: '#ffd166', background: '#202a35', paper: '#293746', line: '#4d5a62' },
  ocean: { label: 'Ocean', primary: '#56b4d3', secondary: '#7ed7c1', highlight: '#ffd166', background: '#172b3a', paper: '#213d4d', line: '#426273' },
  violet: { label: 'Violet', primary: '#c084fc', secondary: '#7dd3fc', highlight: '#fbbf24', background: '#29243a', paper: '#39304d', line: '#5e526e' },
  forest: { label: 'Forest', primary: '#8dcc78', secondary: '#68c5b4', highlight: '#f4cf72', background: '#202e2b', paper: '#2d403a', line: '#506961' },
  sunset: { label: 'Sunset', primary: '#ff8a65', secondary: '#f3a683', highlight: '#f7d794', background: '#35252a', paper: '#4a3236', line: '#76545a' },
  lavender: { label: 'Lavender', primary: '#b39ddb', secondary: '#80cbc4', highlight: '#ffcc80', background: '#29283a', paper: '#3b394f', line: '#615d79' },
  ember: { label: 'Ember', primary: '#ff7043', secondary: '#ef5350', highlight: '#ffca28', background: '#302422', paper: '#46322d', line: '#70534a' },
  mint: { label: 'Mint', primary: '#52b788', secondary: '#74c69d', highlight: '#f6bd60', background: '#1f302b', paper: '#2d443b', line: '#4d6b5c' },
}

function App() {
  const customDuration = (minutes) => Math.max(1, Math.round((Number(minutes) || 0) * 60))

  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    breakType: 'short',
    longBreakInterval: 4,
    automaticFlow: true,
    pomodoroSound: soundOptions[0]?.value || 'none',
    shortBreakSound: soundOptions[2]?.value || soundOptions[0]?.value || 'none',
    longBreakSound: soundOptions[1]?.value || soundOptions[0]?.value || 'none',
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [dynamicTheme, setDynamicTheme] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('coral')
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const activeTheme = themes[selectedTheme]

  const sessions = {
    pomodoro: {
      label: 'Pomodoro',
      duration: customDuration(settings.pomodoro),
      icon: Brain,
      accent: activeTheme.primary
    },

    shortBreak: {
      label: 'Short Break',
      duration: customDuration(settings.shortBreak),
      icon: Coffee,
      accent: activeTheme.secondary
    },

    longBreak: {
      label: 'Long Break',
      duration: customDuration(settings.longBreak),
      icon: Parasol,
      accent: activeTheme.highlight
    }
  }

  const [session, setSession] = useState('pomodoro')
  const [customStates, setCustomStates] = useState([
    { title: 'Study', minutes: 15, color: '#ff795f', sound: soundOptions[0]?.value || 'none', goTo: 2 },
    { title: 'Short break', minutes: 5, color: '#7ed7c1', sound: soundOptions[2]?.value || soundOptions[0]?.value || 'none', goTo: 1 },
  ])
  const [customStateIndex, setCustomStateIndex] = useState(0)
  const [draggedStateIndex, setDraggedStateIndex] = useState(null)
  const [time, setTime] = useState(customDuration(settings.pomodoro))
  const [isRunning, setIsRunning] = useState(false)
  const activeCustomState = customStates[customStateIndex] || customStates[0]
  const activeSession = session === 'custom'
    ? {
      label: activeCustomState.title,
      duration: customDuration(activeCustomState.minutes),
      icon: ListPlus,
      accent: activeCustomState.color,
    }
    : sessions[session]
  const themeAccent = dynamicTheme ? activeSession.accent : activeTheme.primary
  const themeBackground = dynamicTheme ? blendHex(themeAccent, activeTheme.background, 0.16) : activeTheme.background
  const themePaper = dynamicTheme ? blendHex(themeAccent, activeTheme.paper, 0.2) : activeTheme.paper
  const themeLine = dynamicTheme ? blendHex(themeAccent, activeTheme.line, 0.35) : activeTheme.line
  const themeStyle = {
    '--theme-primary': activeTheme.primary,
    '--theme-pomodoro': activeTheme.primary,
    '--theme-short-break': activeTheme.secondary,
    '--theme-long-break': activeTheme.highlight,
    '--theme-background': themeBackground,
    '--theme-paper': themePaper,
    '--theme-line': themeLine,
    '--theme-accent': themeAccent,
    '--coral': dynamicTheme ? themeAccent : activeTheme.primary,
    '--teal': dynamicTheme ? themeAccent : activeTheme.secondary,
    '--yellow': dynamicTheme ? themeAccent : activeTheme.highlight,
    '--paper': themePaper,
    '--line': themeLine,
  }

  const updateSettings = (field, value) => {
    const nextValue = ['breakType', 'pomodoroSound', 'shortBreakSound', 'longBreakSound'].includes(field) || field === 'automaticFlow'
      ? value
      : Math.max(field === 'longBreakInterval' ? 1 : 0, Number(value) || 0)

    setSettings(currentSettings => ({ ...currentSettings, [field]: nextValue }))

    if (session !== 'custom' && ['pomodoro', 'shortBreak', 'longBreak'].includes(field) && session === field) {
      setTime(customDuration(nextValue))
      setIsRunning(false)
    }
  }

  const playCompletionSound = useCallback((sound) => {
    if (sound === 'none') return

    const audio = new Audio(sound)
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [])

  const completeCustomState = useCallback(() => {
    playCompletionSound(activeCustomState.sound)
    const nextIndex = activeCustomState.goTo - 1

    if (nextIndex >= 0 && nextIndex < customStates.length) {
      setCustomStateIndex(nextIndex)
      setTime(customDuration(customStates[nextIndex].minutes))
      setIsRunning(true)
      return
    }

    setIsRunning(false)
    setTime(0)
  }, [activeCustomState, customStates, playCompletionSound])

  const completeStandardSession = useCallback(() => {
    const soundField = session === 'pomodoro' ? 'pomodoroSound' : session === 'shortBreak' ? 'shortBreakSound' : 'longBreakSound'
    playCompletionSound(settings[soundField])

    if (!settings.automaticFlow) {
      setIsRunning(false)
      setTime(0)
      return
    }

    if (session === 'pomodoro') {
      const nextCompletedCount = completedPomodoros + 1
      const shouldUseLongBreak = settings.breakType === 'long'
        || nextCompletedCount % settings.longBreakInterval === 0
      const nextSession = shouldUseLongBreak ? 'longBreak' : 'shortBreak'

      setCompletedPomodoros(nextCompletedCount)
      setSession(nextSession)
      setTime(nextSession === 'longBreak' ? customDuration(settings.longBreak) : customDuration(settings.shortBreak))
      setIsRunning(true)
      return
    }

    setSession('pomodoro')
    setTime(customDuration(settings.pomodoro))
    setIsRunning(true)
  }, [completedPomodoros, playCompletionSound, session, settings])

  useEffect(() => {
    if (!isRunning) return undefined

    const timer = setInterval(() => {
      if (time <= 1) {
        if (session === 'custom') {
          completeCustomState()
        } else {
          completeStandardSession()
        }
        return
      }

      setTime(prevTime => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [completeCustomState, completeStandardSession, isRunning, session, time])

  const selectSession = (nextSession) => {
    setSession(nextSession)
    setCustomStateIndex(0)
    setTime(nextSession === 'custom' ? customDuration(customStates[0].minutes) : sessions[nextSession].duration)
    setIsRunning(false)
    if (nextSession === 'pomodoro') setCompletedPomodoros(0)
  }

  const resetSession = () => {
    setTime(activeSession.duration)
    setIsRunning(false)
  }

  const updateCustomState = (index, field, value) => {
    setCustomStates(currentStates => currentStates.map((state, stateIndex) => (
      stateIndex === index ? { ...state, [field]: value } : state
    )))

    if (session === 'custom' && index === customStateIndex && field === 'minutes') {
      setTime(customDuration(value))
      setIsRunning(false)
    }
  }

  const addCustomState = () => {
    setCustomStates(currentStates => [
      ...currentStates,
      { title: `State ${currentStates.length + 1}`, minutes: 10, color: '#ff795f', sound: soundOptions[0]?.value || 'none', goTo: 1 },
    ])
  }

  const removeCustomState = (index) => {
    if (customStates.length <= 1) return

    const nextStates = customStates.filter((_, stateIndex) => stateIndex !== index)
      .map(state => ({ ...state, goTo: state.goTo > customStates.length - 1 ? 1 : state.goTo }))
    setCustomStates(nextStates)
    setCustomStateIndex(currentIndex => Math.min(currentIndex, nextStates.length - 1))
    if (session === 'custom') setTime(customDuration(nextStates[Math.min(customStateIndex, nextStates.length - 1)].minutes))
  }

  const reorderCustomStates = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return

    const reorderedStates = [...customStates]
    const [movedState] = reorderedStates.splice(fromIndex, 1)
    reorderedStates.splice(toIndex, 0, movedState)
    const newIndexByOldIndex = customStates.reduce((indices, _, oldIndex) => {
      const newIndex = reorderedStates.indexOf(customStates[oldIndex])
      return { ...indices, [oldIndex]: newIndex }
    }, {})
    const remappedStates = reorderedStates.map(state => ({
      ...state,
      goTo: state.goTo === 0 ? 0 : newIndexByOldIndex[state.goTo - 1] + 1,
    }))

    setCustomStates(remappedStates)
    setCustomStateIndex(currentIndex => newIndexByOldIndex[currentIndex])
    setDraggedStateIndex(null)
  }

  const formatTime = (seconds) => {
    const roundedSeconds = Math.max(0, Math.round(seconds))
    return `${Math.floor(roundedSeconds / 60)}:${(roundedSeconds % 60).toString().padStart(2, '0')}`
  }

  const formatSessionDuration = (seconds) => {
    const roundedSeconds = Math.max(0, Math.round(seconds))
    const minutes = Math.floor(roundedSeconds / 60)
    const remainingSeconds = roundedSeconds % 60
    const parts = []

    if (minutes > 0) parts.push(`${minutes}m`)
    if (remainingSeconds > 0) parts.push(`${remainingSeconds}s`)

    return parts.length > 0 ? parts.join(' ') : '0s'
  }

  const ActiveIcon = activeSession.icon

  return (
    <div className="App" style={themeStyle}>
      <Header onOpenSettings={() => setIsSettingsOpen(true)} onOpenTheme={() => setIsThemeOpen(true)} />

      {isSettingsOpen && (
        <SettingsPanel
          settings={settings}
          soundOptions={soundOptions}
          onChange={updateSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isThemeOpen && (
        <ThemePanel
          themes={themes}
          selectedTheme={selectedTheme}
          dynamicTheme={dynamicTheme}
          onThemeChange={theme => {
            setSelectedTheme(theme)
            setDynamicTheme(false)
          }}
          onDynamicChange={setDynamicTheme}
          onClose={() => setIsThemeOpen(false)}
        />
      )}

      <main className="timer-page">
        <section className="timer-hero">
          <div className="timer-hero-heading">
            <div>
              <p className="eyebrow">Current session</p>
              <h1>{activeSession.label}</h1>
            </div>
            <ActiveIcon size={28} strokeWidth={2.2} aria-hidden="true" />
          </div>

          <div className="timer-display">
            <CircularProgress
              size={224}
              progress={(time / activeSession.duration) * 100}
              text={formatTime(time)}
              circleColor="var(--line)"
              progressColor={themeAccent}
              textColor="var(--ink)"
              strokeWidth={11}
            />
          </div>

          <div className="timer-actions">
            <button className="primary-action" type="button" onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? <Pause size={18} fill="currentColor" aria-hidden="true" /> : <Play size={18} fill="currentColor" aria-hidden="true" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button className="icon-action" type="button" onClick={resetSession} aria-label="Reset current session">
              <RotateCcw size={19} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="session-section" aria-labelledby="session-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Choose a rhythm</p>
              <h2 id="session-heading">Sessions</h2>
            </div>
            <span className="session-count">4 modes</span>
          </div>

          <div className="session-grid">
            {[...Object.entries(sessions), ['custom', { label: 'Custom', duration: customDuration(activeCustomState.minutes), icon: ListPlus, accent: activeCustomState.color }]].map(([key, sessionOption]) => {
              return (
                <SessionCard
                  key={key}
                  label={sessionOption.label}
                  durationLabel={formatSessionDuration(sessionOption.duration)}
                  icon={sessionOption.icon}
                  accent={sessionOption.accent}
                  isActive={key === session}
                  onClick={() => selectSession(key)}
                />
              )
            })}
          </div>
        </section>

        {session === 'custom' && (
          <section className="custom-section" aria-labelledby="custom-heading">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Build your flow</p>
                <h2 id="custom-heading">Custom states</h2>
              </div>
              <button className="add-state-button" type="button" onClick={addCustomState}>
                <ListPlus size={17} aria-hidden="true" />
                Add state
              </button>
            </div>

            <div className="custom-state-list">
              {customStates.map((customState, index) => (
                <CustomStateRow
                  key={`${index}-${customState.title}`}
                  state={customState}
                  index={index}
                  stateCount={customStates.length}
                  soundOptions={soundOptions}
                  isCurrent={index === customStateIndex}
                  isDragged={index === draggedStateIndex}
                  onUpdate={(field, value) => updateCustomState(index, field, value)}
                  onDelete={() => removeCustomState(index)}
                  onDragOver={event => event.preventDefault()}
                  onDragStart={() => setDraggedStateIndex(index)}
                  onDrop={() => {
                    if (draggedStateIndex !== null) reorderCustomStates(draggedStateIndex, index)
                  }}
                  onDragEnd={() => setDraggedStateIndex(null)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
