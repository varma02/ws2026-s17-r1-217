import React from "react";

type Props = {
  label: string,
  name?: string,
  id?: string,
  rows?: number,
  isError?: boolean,
  errorMessage?: string,
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export default function TextArea(
  { label, name = label, id = name, rows = 5, isError, errorMessage, ...props }: Props
) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} rows={rows} className={isError ? "error" : ""} {...props}></textarea>
      {isError && <span className="input-error">{errorMessage}</span>}
    </div>
  )
}