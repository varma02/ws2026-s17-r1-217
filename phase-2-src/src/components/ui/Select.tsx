import React from "react";

type Props = {
  label: string,
  children: React.ReactNode,
  name?: string,
  id?: string,
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export default function Select(
  { label, children, name = label, id = name, ...props}: Props
) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} {...props}>
        {children}
      </select>
    </div>
  )
}