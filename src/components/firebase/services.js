import firebase, { db } from './config';

export const addDocument = (collection, data) => {
    const query = db.collection(collection);

    query.add({
        ...data,
        createAt: firebase.firestore.FieldValue.serverTimestamp()
    })
};

export const generateKeywords = (displayName) => {

    const name = displayName.split(' ').filter(word => word);

    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    };

    const createKeywords = (name) => {
        const arrName = [];
        let currName = '';
        name.split('').forEach(letter => {
            currName += letter;
            arrName.push(currName);
        });
        return arrName;
    }
    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }
    findPermutation(0);

    const keyrords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);
    return keyrords;
}