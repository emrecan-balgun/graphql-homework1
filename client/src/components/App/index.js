import { Row, Col } from 'antd';
import styles from './styles.module.css';
 
function App() {
  return (
    <div className={styles.container}>
      <Row justify='center'>
        <Col span={14} className={styles.content}>Col</Col>
      </Row>
    </div>
  );
}

export default App;
