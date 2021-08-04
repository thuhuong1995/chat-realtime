import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {

        let collectionRef = db.collection(collection).orderBy('createAt');

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        }
        const unsubcribe = collectionRef.onSnapshot(snapshot => {
            // func onSnapshot auto update when user have change
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(documents);
        });
        return unsubcribe;
    }, [collection, condition]);
    return documents;
};
export default useFirestore;