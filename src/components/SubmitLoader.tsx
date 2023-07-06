import { Spinner } from "react-bootstrap"

type Props = {
  text: string
  isLoading: boolean
}

export default function Loader({ text, isLoading }: Props) {
  return (
    <>
      {isLoading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        text
      )}
    </>
  )
}
