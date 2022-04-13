import { Form, Input, Button, Select, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LOCATIONS, GET_USERS, NEW_EVENT_MUTATION } from './queries.js';
import { useNavigate  } from 'react-router-dom';

const { Option } = Select;

function NewEventForm() {
    const history = useNavigate();
    const [saveEvent, { loading }] = useMutation(NEW_EVENT_MUTATION);
  
    const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
    const { loading: get_locations_loading, data: locations_data } = useQuery(GET_LOCATIONS);
  
    const handleSubmit = async (values) => {
      try {
        await saveEvent({
          variables: {
            data: values,
          },
        });
        message.success("Event saved!", 4);
        history("/");
      } catch (e) {
        console.log(e);
        message.error("Event not saved", 10);
      }
    }

  return (
    <Form
      name="basic"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input a title!' }]}
      >
        <Input disabled={loading} size="large" placeholder="Title"/>
      </Form.Item>

      <Form.Item
        name="desc"
      >
        <Input disabled={loading} size="large" placeholder="Description" />
      </Form.Item>

      <Form.Item
        name="date"
      >
        <Input.TextArea disabled={loading} size="large" placeholder="Date" />
      </Form.Item>

      <Form.Item
        name="from"
      >
        <Input.TextArea disabled={loading} size="large" placeholder="From" />
      </Form.Item>

      <Form.Item
        name="to"
      >
        <Input.TextArea disabled={loading} size="large" placeholder="To" />
      </Form.Item>

      <Form.Item
        name="location_id"
        rules={[{ required: true, message: 'Please select location!' }]}
      >
        <Select 
          disabled={get_locations_loading || loading} 
          loading={get_locations_loading} 
          placeholder="Select a location" 
          size="large"
        >
          {
            locations_data && locations_data.locations.map((item) => 
            <Option 
              key={item.id} 
              value={item.id}>
                {item.name}
            </Option>
            )
          }
        </Select>
      </Form.Item>

      <Form.Item
        name="user_id"
        rules={[{ required: true, message: 'Please select user!' }]}
      >
        <Select 
          disabled={get_users_loading || loading} 
          loading={get_users_loading} 
          placeholder="Select a user" 
          size="large"
        >
          {
            users_data && users_data.users.map((item) => 
            <Option 
              key={item.id} 
              value={item.id}>
                {item.username}
            </Option>
            )
          }
        </Select>
      </Form.Item>

      <Form.Item>
        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewEventForm