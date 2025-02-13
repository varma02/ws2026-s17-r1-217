import React from "react";

type Props = {
  label: string,
  children: React.ReactNode,
  name?: string,
  id?: string,
  isError?: boolean,
  errorMessage?: string,
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export default function Select(
  { label, children, name = label, id = name, isError, errorMessage, ...props}: Props
) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} className={isError ? "error" : ""} {...props}>
        {children}
      </select>
      {isError && <span className="input-error">{errorMessage}</span>}
    </div>
  )
}