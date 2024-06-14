import Spinner from "react-bootstrap/Spinner"
import Button, { type ButtonProps } from "react-bootstrap/Button"
import { cn } from "lib/utils"

type Props = ButtonProps & {
  children: React.ReactNode
  disabled: boolean
}

export default function SubmitButton({ className, children, ...props }: Props) {
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
        role="status"
        aria-hidden={!props.disabled}
        className={props.disabled ? "" : "d-none"}
      />
      {children}
    </Button>
  )
}
