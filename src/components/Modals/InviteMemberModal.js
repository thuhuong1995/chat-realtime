import { Form, Modal, Select, Spin } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { debounce } from 'lodash';
import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../Context/AppProvider';
import { db } from '../firebase/config';

const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMember).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map(opt => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.displayName ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {`${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}
const fetchUserList = async (search, curMember) => {
    return db
        .collection('user')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,
            })).filter(opt => !curMember.includes(opt.value))
        });
}
const InviteMemberModal = () => {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    const [form] = Form.useForm()
    const [value, setValue] = useState([])

    const handleOk = () => {

        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)],
        })

        form.resetFields();
        setIsInviteMemberVisible(false)
    }
    const handleCancel = () => {
        form.resetFields();
        setIsInviteMemberVisible(false)
    }

    return (
        <div>
            <Modal
                title='Invite Members'
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical' /*form is value in [form] */  >
                    <DebounceSelect
                        mode='multiple'
                        label='Friend name'
                        value={value}
                        placehoder='Enter your user name'
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMember={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberModal;
