import { Form, Input, Modal } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import { addDocument } from '../firebase/services';

const AddRoomModal = () => {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [form] = Form.useForm()

    const handleOk = () => {

        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
        form.resetFields();
        setIsAddRoomVisible(false)
    }
    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false)
    }

    return (
        <div>
            <Modal
                title='Create room'
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical' /*form is value in [form] */  >
                    <Form.Item label='Room name' name='name'>
                        <Input placeholder='Enter your Room name' />
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <Input placeholder='Enter your description' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;
