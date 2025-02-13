import React from "react"

type Props = {
  label: string,
  name?: string,
  id?: string,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Input(
  { label, name = label, id = name, ...props }: Props
) {
  if (!props.type) props.type = "text"
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} {...props} autoComplete="off" />
    </div>
  )
}