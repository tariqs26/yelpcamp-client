import Form from "components/forms/campground-form"
import useCreateCampground from "./useCreateCampground"

export default function CreateCampground() {
  return <Form {...useCreateCampground()} />
}
