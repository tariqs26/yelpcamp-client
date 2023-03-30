import useUpdateCampground from './useUpdateCampground';
import Modal from 'react-bootstrap/Modal';
import Form from 'components/Form';
import './index.css';

type Props = {
  campground: Campground;
  showModal: boolean;
  closeModal: () => void;
};
export default function EditCampground(componentProps: Props) {
  const { campground, showModal, closeModal } = componentProps;
  const props = useUpdateCampground(campground, closeModal);
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit Campground
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          {...props}
          leaveHandler={closeModal}
          initialData={campground}
          action='Update'
        />
      </Modal.Body>
    </Modal>
  );
}
