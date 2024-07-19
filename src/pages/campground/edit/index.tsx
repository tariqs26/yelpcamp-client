import Modal from "react-bootstrap/Modal"
import Form from "components/forms/campground-form"
import useUpdateCampground from "./useUpdateCampground"
import "./index.css"

type Props = Readonly<{
  campground: Campground
  showModal: boolean
  closeModal: () => void
}>

function CampgroundEdit(props: Props) {
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
