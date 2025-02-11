import React from "react";

type Props = {
  label: string,
  children: React.ReactNode,
  name?: string,
  id?: string,
}

export default function Select(
  { label, children, name = label, id = name }: Props
) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name}>
        {children}
      </select>
    </div>
  )
}