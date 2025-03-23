import Modal from "react-bootstrap/Modal"
import type { Campground } from "~/types"
import { useUpdateCampground } from "./useUpdateCampground"
import { CampgroundForm } from "~/components/forms/campground-form"

import "./index.css"

type EditCampgroundModalProps = Readonly<{
  campground: Campground
  showModal: boolean
  closeModal: () => void
}>

export const EditCampgroundModal = (props: EditCampgroundModalProps) => {
  const { campground, showModal, closeModal } = props
  const formProps = useUpdateCampground(campground, closeModal)

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Campground
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CampgroundForm
          {...formProps}
          leaveHandler={closeModal}
          initialData={campground}
        />
      </Modal.Body>
    </Modal>
  )
}
