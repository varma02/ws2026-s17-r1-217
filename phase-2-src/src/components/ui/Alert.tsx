
type Props = {
  message: string,
}

export default function Alert(
  { message }: Props
) {
  return (
    <div className="alert">
      <img src="./assets/alert.svg" alt="Alert" />
      <span>{message}</span>
    </div>
  )
}