import React from "react"
import Container from "./components/Container"
import Input from "./components/ui/Input"
import TextArea from "./components/ui/TextArea"
import Select from "./components/ui/Select"
import { usePersistedState, validateFloorplan, validateGeneralInfo } from "./utils"
import FloorplanDesigner from "./components/FloorplanDesigner"
import Radio from "./components/ui/Radio"
import Checkbox from "./components/ui/Checkbox"

const GRID_SIZE_X = 6
const GRID_SIZE_Y = 5
function getStartingFloorplan() {
  return Array.from({length:GRID_SIZE_X}).fill(Array.from({length:GRID_SIZE_Y}).fill("-")) as any
}

function App() {
  const [step, setStep] = usePersistedState<number>("step", 0)
  const [errors, setErrors] = usePersistedState<string[]>("errors", [])
  const [formState, setFormState] = usePersistedState<{[key: string] : any}>("formState", {})
  const [floorplan, setFloorplan] = usePersistedState<string[][]>("floorplan", getStartingFloorplan())

  function getCurrentFormData(form: HTMLFormElement) {
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
    } else if (step == 1) {
      invalid = validateFloorplan(floorplan) ? [] : ["floorplan"]
    } else if (step == 2) {
      state = {
        freeWiFi: !!formdata.get("freeWiFi"),
        accessibleEntry: !!formdata.get("accessibleEntry"),
        loungeArea: !!formdata.get("loungeArea"),
        backgroundMusic: !!formdata.get("backgroundMusic"),
        customerService: !!formdata.get("customerService"),
        parking: formdata.get("parking"),
      }
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
        const { invalid, state } = getCurrentFormData(event.target as HTMLFormElement)
        if (invalid.length) {
          setErrors(invalid)
          document.getElementsByName(invalid[0])[0]?.focus()
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
      const { invalid } = getCurrentFormData((event.target as any).form)
      setErrors(invalid)
    }
  }

  function reset() {
    setStep(0)
    setErrors([])
    setFormState({})
    setFloorplan(getStartingFloorplan())
  }

  function getFloorplanURL() {
    return window.URL.createObjectURL(new Blob([floorplan.map((arr) => arr.join(",")).join("\n")], {type: 'text/csv'}))
  }

  function copyFormState() {
    navigator.clipboard.writeText(JSON.stringify(formState))
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
      {step === 1 && (
        <FloorplanDesigner floorplan={floorplan} setFloorplan={setFloorplan} isError={!!errors.length} />
      )}
      {step == 2 && (<>
        <h2>Amenities and Services</h2>
        <Checkbox label="Free Wi-Fi" name="freeWiFi" />
        <Checkbox label="Accessible entry" name="accessibleEntry" />
        <Checkbox label="LoungeArea" name="loungeArea" />
        <Checkbox label="Background Music" name="backgroundMusic" />
        <Checkbox label="Personal customer service" name="customerService" />
        <hr />
        <h3>Parking</h3>
        <div className="input-row">
          <Radio label="Easy" value="Easy" name="parking" id="parking-easy" defaultChecked/>
          <Radio label="Medium" value="Medium" name="parking" id="parking-medium"/>
          <Radio label="Hard" value="Hard" name="parking" id="parking-hard"/>
        </div>
      </>)}
      {step == 3 && (
        <div className="step-4-screen">
          <h2>Successful submission!</h2>
          <p>Thank you for the new location registration!</p>
          <button className="btn" type='button' onClick={copyFormState}>
            Copy form values
          </button>
          <a className="btn" type='button' download="floorplan.csv" href={getFloorplanURL()}>
            Export floorplan
          </a>
          <hr />
          <button className="btn" type='button' onClick={reset}>
            Start over
          </button>
        </div>
      )}
    </Container>
  )
}

export default App
