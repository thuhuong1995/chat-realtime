import React, { createContext, useContext, useMemo, useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const { user: { uid } } = useContext(AuthContext);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        }
    }, [uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = useMemo(
        () => rooms.find(room => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom.members]);

    const members = useFirestore('user', usersCondition);

    return (
        <AppContext.Provider value={{
            rooms,
            members,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            selectedRoom,
            isInviteMemberVisible,
            setIsInviteMemberVisible

        }} >
            {/* declare state isAddRoomVisible, setIsAddRoomVisible and put in by value
            all children component will receive by useContex(AppContext) //  
            */}
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
