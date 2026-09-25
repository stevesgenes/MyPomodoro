
<div align="center">
<h1><img src="images/webicon_high.png" alt="" width="20%" align="middle">MyPomodoro</h1>
</div>

## Features

- Pomodoro, short break, long break, and custom timer modes
- Start, pause, and reset controls
- Configurable Pomodoro and break durations
- Automatic break flow with configurable repetition intervals
- Optional automatic flow toggle
- Completion sounds for Pomodoro and break sessions
- Custom timer states with:
  - Title
  - Duration in minutes, including half-minute values
  - Custom color
  - Completion sound
  - Next-state routing
- Drag-and-drop reordering for custom states
- Static color themes
- Dynamic themes that blend the active session accent into the page background and surfaces
- Automatically discovered sound files from `src/sounds`

## Using Custom States

1. Select the **Custom** session card.
2. Edit the state title and duration.
3. Choose a completion sound.
4. Select the destination state or **Stop**.
5. Drag states using the grip icon to reorder them.
6. Choose a color for each state.

Durations accept decimal minute values such as `0.5`. A duration of `0` runs as a one-second state.

## Settings

Open Settings from the gear button in the top bar to configure:

- Pomodoro duration
- Short break duration
- Long break duration
- Automatic flow
- Break type after each Pomodoro
- Long break repetition interval
- Completion sound for each standard session

When automatic flow is enabled, completed sessions advance to the configured next session. When it is disabled, the timer stops at `0:00` after playing its completion sound.

## Themes

Open the palette button in the top bar to choose a theme.

Static themes change the overall site palette, including backgrounds, surfaces, borders, and accents. Dynamic Theme follows the active Pomodoro, break, or custom-state color and blends it into darker page surfaces.