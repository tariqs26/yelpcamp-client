import { CampgroundForm } from "~/components/forms/campground-form"
import { useCreateCampground } from "./useCreateCampground"

export default function CreateCampgroundPage() {
  return <CampgroundForm {...useCreateCampground()} />
}
