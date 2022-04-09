import { useEffect } from 'react';
import { List } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_EVENTS, EVENT_SUBSCRIPTION } from './queries';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Home() {
    const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

    useEffect(() => {
        subscribeToMore({
            document: EVENT_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) return prev;

                return {
                    events: [
                        ...prev.events,
                        subscriptionData.data.eventCreated
                    ],
                }
            }
        })
    }, [subscribeToMore]);

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