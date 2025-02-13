import React from "react"

type Props = {
  label: string,
  name?: string,
  id?: string,
  isError?: boolean,
  errorMessage?: string,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Input(
  { label, name = label, id = name, isError, errorMessage, ...props }: Props
) {
  if (!props.type) props.type = "text"
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} {...props} autoComplete="off" className={isError ? "error" : ""} />
      {isError && <span className="input-error">{errorMessage}</span>}
    </div>
  )
}