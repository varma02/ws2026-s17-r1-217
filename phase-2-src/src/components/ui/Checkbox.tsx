import React from 'react';

type Props = {
  label: string,
  name?: string,
  id?: string,
}

export default function Checkbox(
  {label, name = label, id = name}: Props
) {
  return (
    <label className="cnr-label" htmlFor={id}>
      <input type="checkbox" id={id} name={name} />
      <span>{label}</span>
    </label>
  )
}