import React from 'react';

type Props = {
  step: number,
  fullscreenElement: React.RefObject<any>,
}

export default function Header(
  { step = 0, fullscreenElement }: Props
) {

  function handleFullscreen() {
    if (!fullscreenElement.current) return
    if (!document.fullscreenElement) {
      fullscreenElement.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <header className="header">
      <h1>Register a new location</h1>
      <div className="steps">
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} style={{display: 'contents'}}>
            <button className={`step ${i < step && 'done'} ${i == step && 'current'}`}>
              {step == 3 ? (
                <img src="check.svg" alt="Check" />
              ) : i+1}
            </button>
            {i != 3 && <div className={`step-divider ${i+1 > step && 'dashed' }`}></div>}
          </div>
        ))}
      </div>
      <button className="fullscreen-btn" onClick={handleFullscreen}>
        <img src="maximize.svg" alt="Maximize" />
      </button>
    </header>
  )
}