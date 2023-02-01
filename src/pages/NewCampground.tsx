import { useCreateCampground } from '../hooks/campground/useCreateCampground';
import Form from 'components/Form';

export default function NewCampground() {
  const props = useCreateCampground();
  return <Form {...props} action='Create' />;
}
