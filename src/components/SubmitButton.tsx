import Spinner from "react-bootstrap/Spinner"
import Button, { type ButtonProps } from "react-bootstrap/Button"
import { cn } from "utils"

type Props = ButtonProps & {
  children: React.ReactNode
  disabled: boolean
  notForm?: boolean
}

export default function SubmitButton({
  children,
  disabled,
  notForm = false,
  ...props
}: Props) {
  return (
    <Button
      type="submit"
      variant="success"
      className={cn(
        "d-inline-flex align-items-center justify-content-center",
        !notForm && "me-2 w-100",
        props.className
      )}
      disabled={disabled}
      {...props}
    >
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden={!disabled}
        className={`position-absolute ${disabled ? "" : "opacity-0"}`}
      />
      <span className={`${disabled ? "opacity-0" : ""}`}>{children}</span>
    </Button>
  )
}
