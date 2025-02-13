import React from 'react';

type Props = {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  children: React.ReactNode,
}

export default function Container(
  { step, setStep, children }: Props
) {

  const containerRef = React.useRef<any>(undefined)

  function handleFullscreen() {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <article className="container" ref={containerRef}>
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
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <button className="btn" disabled>Back</button>
        <button className="btn">Next</button>
      </footer>
    </article>
  )
}