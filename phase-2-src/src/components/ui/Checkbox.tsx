import React from 'react';

type Props = {
  label: string,
  name?: string,
  id?: string,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Checkbox(
  {label, name = label, id = name, ...props}: Props
) {
  return (
    <label className="cnr-label" htmlFor={id}>
      <input type="checkbox" id={id} name={name} {...props} />
      <span>{label}</span>
    </label>
  )
}