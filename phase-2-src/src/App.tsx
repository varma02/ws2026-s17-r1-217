import React from "react"
import Container from "./components/Container"
import Input from "./components/ui/Input"
import TextArea from "./components/ui/TextArea"
import Select from "./components/ui/Select"
import { validateGeneralInfo } from "./utils"

function App() {
  const [step, setStep] = React.useState(0)
  const [errors, setErrors] = React.useState<string[]>([])
  const [formState, setFormState] = React.useState<{[key: string] : any}>({})

  function getCurrentFormState(form: HTMLFormElement) {
    const formdata = new FormData(form)
    let invalid: string[] = []
    let state: any = {}
    if (step == 0) {
      state = {
        name: formdata.get("name")?.toString() || "",
        description: formdata.get("description")?.toString() || "",
        postalCode: parseInt(formdata.get("postalCode")?.toString() || ""),
        city: formdata.get("city")?.toString() || "",
        address: formdata.get("address")?.toString() || "",
        openAt: formdata.get("openAt")?.toString() || "",
        from: formdata.get("from")?.toString() || "",
        to: formdata.get("to")?.toString() || "",
      }
      invalid = validateGeneralInfo(state)
    }
    return {
      invalid: invalid,
      state: state
    }
  }

  function handleStep(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const action = (event.nativeEvent as SubmitEvent).submitter?.dataset?.step
    if (action) {
      if (action == "next") {
        const { invalid, state } = getCurrentFormState(event.target as HTMLFormElement)
        if (invalid.length) {
          setErrors(invalid)
        } else {
          setFormState((o) => ({...o, ...state}))
          setStep((o) => o+1)
        }
      } else if (action == "back") {
        setStep((o) => o-1)
      } else if (!isNaN(parseInt(action))) {
        setStep(parseInt(action))
      }
    }
  }

  function handleInput(event: React.FormEvent<HTMLFormElement>) {
    if (errors.length) {
      const { invalid } = getCurrentFormState((event.target as any).form)
      setErrors(invalid)
    }
  }

  return (
    <Container step={step} onSubmit={handleStep} onInput={handleInput}>
      {step === 0 && (<>
        <h2>Information about the Locaion</h2>
        <Input label="Name" name="name" defaultValue={formState['name']}
        isError={errors.includes("name")} errorMessage="Required, 3 - 32 characters" />
        <TextArea label="Description" name="description" defaultValue={formState['description']}
        isError={errors.includes("description")} errorMessage="Required, 10 - 256 characters"/>
        <div className="input-row">
          <Input label="Postal code" name="postalCode" defaultValue={formState['postalCode']}
          isError={errors.includes("postalCode")} errorMessage="Required, 4 numeric characters"/>
          <Input label="City" name="city" defaultValue={formState['city']}
          isError={errors.includes("city")} errorMessage="Required, 3 - 32 characters"/>
          <Input label="Address" name="address" defaultValue={formState['address']}
          isError={errors.includes("address")} errorMessage="Required, 5 - 128 characters"/>
        </div>
        <hr />
        <h3>Operational hours</h3>
        <Select label="Open At" name="openAt" defaultValue={formState['openAt'] || "Every Day"}
        isError={errors.includes("openAt")} errorMessage="Required">
          <option value="Every Day">Every Day</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
        </Select>
        <div className="input-row">
          <Input type="time" label="From" name="from" defaultValue={formState['from']}
          isError={errors.includes("from")} errorMessage="Required"/>
          <Input type="time" label="To" name="to" defaultValue={formState['to']}
          isError={errors.includes("to")} errorMessage="Required"/>
        </div>
      </>)}
    </Container>
  )
}

export default App
