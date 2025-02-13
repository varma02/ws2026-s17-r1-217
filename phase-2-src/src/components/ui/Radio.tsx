import React from 'react';

type Props = {
  label: string,
  name?: string,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Radio(
  { label, name = label, ...props }: Props
) {
  return (
    <label className="cnr-label">
      <input type="radio" name={name} {...props}/>
      <span>{label}</span>
    </label>
  )
}