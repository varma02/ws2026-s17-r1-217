import React from "react";

type Props = {
  label: string,
  name?: string,
  id?: string,
  rows?: number
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export default function TextArea(
  { label, name = label, id = name, rows = 5, ...props }: Props
) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} rows={rows} {...props}></textarea>
    </div>
  )
}