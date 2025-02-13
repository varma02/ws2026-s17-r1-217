import React from "react"
import Container from "./components/Container"
import Input from "./components/ui/Input"
import TextArea from "./components/ui/TextArea"
import Select from "./components/ui/Select"

function App() {
  const [step, setStep] = React.useState(0)
  const [errors, setErrors] = React.useState([])
  const [formState, setFormState] = React.useState({})

  function handleStep(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const action = (event.nativeEvent as SubmitEvent).submitter?.dataset?.step
    if (action) {
      if (action == "next") {
        setStep((o) => o+1)
      } else if (action == "back") {
        setStep((o) => o-1)
      } else if (!isNaN(parseInt(action))) {
        setStep(parseInt(action))
      }

    }
  }

  return (
    <Container step={step} onSubmit={handleStep}>
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
          <option value="everyday">Every Day</option>
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
