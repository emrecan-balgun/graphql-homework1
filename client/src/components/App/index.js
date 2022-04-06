import { Row, Col } from 'antd';
import styles from './styles.module.css';

import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
 
function App() {
  return (
    <div className={styles.container}>
      <Row justify='center'>
        <Col span={14} className={styles.content}>Col
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
              )}
            />
        </Col>
      </Row>
    </div>
  );
}

export default App;
