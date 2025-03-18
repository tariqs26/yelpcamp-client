import Button, { type ButtonProps } from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { cn } from "lib/utils"

export default function SubmitButton({
  className,
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <Button
      type="submit"
      variant="success"
      className={cn(
        "d-inline-flex align-items-center justify-content-center gap-2",
        className
      )}
      {...props}>
      <Spinner
        animation="border"
        size="sm"
        aria-hidden={!props.disabled}
        className={props.disabled ? "" : "d-none"}
      />
      {children}
    </Button>
  )
}
