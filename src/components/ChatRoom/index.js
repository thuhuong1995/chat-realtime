import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const ChatRoom = () => {
    return (
        <div>
            <Row>
                <Col span={6} className='sidebar'>
                    <Sidebar />
                </Col>
                <Col span={18} className='window'>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    );
}

export default ChatRoom;
