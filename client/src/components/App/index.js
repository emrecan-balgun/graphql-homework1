import { Row, Col } from 'antd';
import styles from './styles.module.css';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from 'pages/Home'
import HeaderMenu from './HeaderMenu';
import NewEvent from 'pages/NewEvent';
 
function App() {
  return (
    <div className={styles.container}>
      <Row justify='center'>
        <Col span={14} className={styles.content}>
        <HeaderMenu />
        <div className={styles.content}>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/new" element={<NewEvent/>} />
            </Routes>
        </div>  
        </Col>
      </Row>
    </div>
  );
}

export default App;
