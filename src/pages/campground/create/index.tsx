import useCreateCampground from "./useCreateCampground"
import Form from "components/Form"

export default function CreateCampground() {
  return <Form {...useCreateCampground()} />
}
