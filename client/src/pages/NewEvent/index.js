import { Typography } from 'antd';
import NewEventForm from './NewEventForm';
const { Title } = Typography;

function NewEvent() {
  return (
    <div>
      <Title level={3}>New Event</Title>
      <NewEventForm />
    </div>
    
  )
}

export default NewEvent