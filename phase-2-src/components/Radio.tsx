import React from 'react';

type Props = {
  label: string,
  name?: string,
}

export default function Radio(
  { label, name = label }: Props
) {
  return (
    <label className="cnr-label">
      <input type="radio" name={name}/>
      <span>{label}</span>
    </label>
  )
}