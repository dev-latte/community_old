import { dbService, firebaseInstance } from "../fbInstance";
// Todo : DB 중복 제거하기


// init data on firebase
export const firebaseAPI = async ({userObj}, dbCollection, defaultData) => {
    console.log(`Calling status API from ${dbCollection}`);
    return await dbService.collection(dbCollection)
        .where("uid", "==", userObj.uid)
        .get()
        .then((doc) => {
            const data = doc.empty ? undefined : doc.docs[0];
            if (data === undefined ? false : data.exists) {
                return data.data();
            } else {
                createData(userObj.uid, dbCollection, defaultData);
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// add data on firebase
export const createData = async (uid, dbCollection, data) => {
    console.log(`Calling status API from ${dbCollection}`);
    await dbService.collection(dbCollection).doc(uid).set(data)
    .catch(error => {
        console.error("Error adding document: ", error);
    });
}

export const createDataWithoutUid = async (dbCollection, data) => {
    console.log(`Calling status API from ${dbCollection}`);
    await dbService.collection(dbCollection).add(data)
    .catch(error => {
        console.error("Error adding document: ", error);
    });
}

// get twitter data
export const getData = async (uid, dbCollection) => {
    console.log(`Calling status API from ${dbCollection}`);
    return await dbService.collection(dbCollection)
        .where("id_str", "==", uid)
        .get()
        .then((doc) => {
            const data = doc.empty ? undefined : doc.docs[0];
            if (data === undefined ? false : data.exists) {
                return data.data();
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

export const getAllData = async (dbCollection) => {
    console.log(`Calling status API from ${dbCollection}`);
    return await dbService.collection(dbCollection).get();
}

export const getMemberData = async (dbCollection, name) => {
    return await dbService.collection(dbCollection)
        .where("name", "==", name)
        .get();
}



// update userInventoryData for memoryCardId
export const updateData = async (uid, dbCollection, data) => {
    const ref = dbService.collection(dbCollection).doc(uid);
    ref.update({
        // 중복 요소에 대해서 고민해보기(현재는 중복x)
        memoryCardId: firebaseInstance.firestore.FieldValue.arrayUnion(data)
    }).then(() => {
        console.log("Document successfully updated!");
    });
}

export const getUserItemInfo = async (uid, dbCollection) => {
    console.log(`Item Information! ${dbCollection}`);
    return await dbService.collection(dbCollection).doc(uid).get();
}

// update equipment information
export const updateEquipmentData = async (uid, dbCollection, data) => {
    const kinds = data.id.split("-")[2];
    const updateData = (kinds === "W") ? { weapon: data } : (kinds === "A") 
                    ? { armor: data } : { accessory: data };
    dbService.collection(dbCollection).doc(uid).update(updateData).then(() => {
        console.log("Equipment Data successfully updated!");
    });
}

// random item
export const getMemoryCardInfoForRandom = async (uid, dbCollection, grade) => {
    console.log(`Item Information! ${dbCollection}`);
    const result = await dbService.collection(dbCollection)
                    .where("grade", "==", grade)
                    .get().then(doc => {
                        console.log(grade);
                        if(doc.docs.length === 0) { return false; }
                        const random = Math.floor(Math.random() * (doc.docs.length));
                        const data = doc.docs[random].data();
                        updateData(uid, process.env.REACT_APP_DB_USER_INVENTORY, data);
                        return data;
                    })
    return result;
}

