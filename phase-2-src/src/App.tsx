import React from "react"
import Container from "./components/Container"
import Input from "./components/ui/Input"
import TextArea from "./components/ui/TextArea"
import Select from "./components/ui/Select"

function App() {
  
  const [step, setStep] = React.useState(0)

  return (
    <Container step={step} setStep={setStep}>
      {step === 0 && (<>
        <h2>Information about the Locaion</h2>
        <Input label="Name" name="name" />
        <TextArea label="Description" name="description" />
        <div className="input-row">
          <Input label="Postal code" name="postcode" />
          <Input label="City" name="city" />
          <Input label="Address" name="address" />
        </div>
        <hr />
        <h3>Operational hours</h3>
        <Select label="Open At" name="open-at">
          <option value="everyday" selected>Every Day</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends</option>
        </Select>
        <div className="input-row">
          <Input type="time" label="From" name="open-from" />
          <Input type="time" label="To" name="open-to" />
        </div>
      </>)}
    </Container>
  )
}

export default App
