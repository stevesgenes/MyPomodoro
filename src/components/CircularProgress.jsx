import React from 'react';

const CircularProgress = ({ text = null, size = 150, progress = 0, strokeWidth = 10, circleColor = '#e6e6e6', progressColor = '#3b82f6', textColor = '#333' }) => {
  const validatedProgress = Math.min(Math.max(progress, 0), 100);

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (validatedProgress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={circleColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          // style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: `${size * 0.18}px`, fontWeight: 'bold', color: textColor
      }}>
        {text || `${Math.round(validatedProgress)}%`}
      </div>
    </div>
  );
};

export default CircularProgress;
