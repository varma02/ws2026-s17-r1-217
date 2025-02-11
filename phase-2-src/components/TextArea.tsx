import React from "react";

type Props = {
  label: string,
  placeholder?: string,
  name?: string,
  id?: string,
  rows?: number
}

export default function TextArea(
  { label, placeholder = "", name = label, id = name, rows = 5 }: Props
) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} rows={rows} placeholder={placeholder}></textarea>
    </div>
  )
}