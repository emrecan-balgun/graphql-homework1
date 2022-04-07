import { List } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from './queries';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Home() {
    const { loading, error, data } = useQuery(GET_EVENTS);

    if (loading) 
        return <div>Loading...</div>;

    if (error)
    return <div>Error: {error.message}</div>

  return (
        <List
            itemLayout="horizontal"
            dataSource={data.events}
            renderItem={item => (
                <List.Item>
                <List.Item.Meta
                    title={<Link to={`/event/${item.id}`} className={styles.listItem}>{item.title}</Link>}
                    description={<Link to={`/event/${item.id}`} className={styles.listItem}>{item.desc}</Link>}
                />
                <span>{item.date}</span>
                </List.Item>
                )}
        />   
  )
}

export default Home