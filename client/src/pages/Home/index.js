import { List } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from './queries';

// const list = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
// ];



function Home() {
    const { loading, error, data } = useQuery(GET_EVENTS);

    if (loading) 
        return <div>Loading...</div>;

    if (error)
    return <div>Error: {error.message}</div>

    console.log(data.events);

  return (
        <List
            itemLayout="horizontal"
            dataSource={data.events}
            renderItem={item => (
                <List.Item>
                <List.Item.Meta
                    title={item.title}
                    description={item.desc}
                />
                <span>{item.date}</span>
                </List.Item>
                )}
        />
  )
}

export default Home