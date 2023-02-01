import { useUpdateCampground } from '../../hooks/campground/useUpdateCampground';
import Form from 'components/Form';
import Modal from 'react-bootstrap/Modal';
import './EditCampground.css';

type Props = {
  campground: Campground;
  showModal: boolean;
  closeModal: () => void;
};
const EditCampground: React.FC<Props> = (componentProps) => {
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
};

export default EditCampground;
