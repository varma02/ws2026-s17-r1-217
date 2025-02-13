import React from "react"

type Props = {
  label: string,
  placeholder?: string,
  type?: "text" | "number" | "time",
  name?: string,
  id?: string,
}

export default function Input(
  { label, placeholder = "", type = "text", name = label, id = name }: Props
) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} placeholder={placeholder} />
    </div>
  )
}