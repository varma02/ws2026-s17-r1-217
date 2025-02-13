import React from "react"
import Container from "./components/Container"

function App() {
  
  const [step, setStep] = React.useState(0)

  return (
    <Container step={step} setStep={setStep}>
      asd
    </Container>
  )
}

export default App
