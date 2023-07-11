import useCreateCampground from "./useCreateCampground"
import Form from "components/Form"

export default function NewCampground() {
  const props = useCreateCampground()
  return <Form {...props} action="Create" />
}
