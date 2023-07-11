import useUpdateCampground from "./useUpdateCampground"
import Modal from "react-bootstrap/Modal"
import Form from "components/Form"
import "./index.css"

type EditCampgroundProps = {
  campground: Campground
  showModal: boolean
  closeModal: () => void
}

const CampgroundEdit = (props: EditCampgroundProps) => {
  const { campground, showModal, closeModal } = props
  const formProps = useUpdateCampground(campground, closeModal)
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Campground
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          {...formProps}
          leaveHandler={closeModal}
          initialData={campground}
        />
      </Modal.Body>
    </Modal>
  )
}

export default CampgroundEdit
