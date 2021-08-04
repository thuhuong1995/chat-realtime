import { SendOutlined, UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import { addDocument } from '../firebase/services';
import useFirestore from '../hooks/useFirestore';
import './chatwindow.css';
import Message from './Message';

const ChatWindow = () => {
    const { members, selectedRoom, setIsInviteMemberVisible } = useContext(AppContext);
    const [inputValue, setInputValue] = useState('');
    const { user: { uid, displayName, photoURL } } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleInvite = () => {
        setIsInviteMemberVisible(true)
    }

    const handleInputMessage = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
        addDocument('message', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        });

        form.resetFields(['message']);
    };

    const conditionMess = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id]);

    const message = useFirestore('message', conditionMess);
    return (
        <>
            <div className='window__header'>
                <div className='window__title'>
                    <p className='window__title-name'>{selectedRoom.name}</p>
                    <p className='window__title-desc'>{selectedRoom.description}</p>
                </div>
                <div className='window__action'>
                    <Button icon={<UserAddOutlined />} onClick={handleInvite}>Invite</Button>
                    <Avatar.Group size='small' maxCount={2} style={{ cursor: 'pointer', marginLeft: 10 }}>
                        {
                            members.map(member =>
                                <Tooltip title={member.displayName} key={member.id}>
                                    <Avatar src={member.photoURL}>
                                        {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                </Tooltip>)
                        }
                    </Avatar.Group>
                </div>
            </div>
            <div className='window__body'>
                <div className='window__message'>
                    {
                        message.map(mes =>
                            <Message
                                key={mes.id}
                                text={mes.text}
                                photoURL={mes.photoURL}
                                displayName={mes.displayName}
                                createAt={mes.createAt}
                            />
                        )
                    }

                </div>
                <Form className='window__form' form={form}>
                    <Form.Item className='form-group' name='message'>
                        <Input
                            onChange={handleInputMessage}
                            onPressEnter={handleOnSubmit}
                            placeholder='Enter your message...'
                            className='window__form-input'
                            autoComplete='off'
                        />
                    </Form.Item>
                    <Button
                        icon={<SendOutlined />}
                        className='window__form-btn'
                        onClick={handleOnSubmit}
                    >
                        Send
                    </Button>

                </Form>
            </div>
        </ >
    );
}

export default ChatWindow;
