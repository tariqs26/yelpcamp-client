import useCreateCampground from "./useCreateCampground"
import Form from "components/forms/campground-form"

export default function CreateCampground() {
  return <Form {...useCreateCampground()} />
}
