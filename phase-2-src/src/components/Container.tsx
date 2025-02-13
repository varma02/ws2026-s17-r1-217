import React from 'react';

type Props = {
  step: number,
  children: React.ReactNode,
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export default function Container(
  { step, children, ...props }: Props
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
    <form className="container" ref={containerRef} {...props}>
      <header className="header">
        <h1>Register a new location</h1>
        <div className="steps">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} style={{display: 'contents'}}>
              <button className={`step ${i < step && 'done'} ${i == step && 'current'}`}
              aria-label={`Select step ${i+1}`} data-step={i} type='submit'
              disabled={step == 3 || i+1 > step}>
                {step == 3 ? (
                  <img src="check.svg" alt="Check" />
                ) : i+1}
              </button>
              {i != 3 && <div className={`step-divider ${i+1 > step && 'dashed' }`}></div>}
            </div>
          ))}
        </div>
        <button className="fullscreen-btn" onClick={handleFullscreen} type='button'>
          <img src="maximize.svg" alt="Maximize" />
        </button>
      </header>
      <main className="main">
        {children}
      </main>
      {step < 3 && (
        <footer className="footer">
          <button className="btn" disabled={step == 0} type='submit' data-step='back'>
            Back
          </button>
          <button className="btn" type='submit' data-step='next'>
            Next
          </button>
        </footer>
      )}
    </form>
  )
}