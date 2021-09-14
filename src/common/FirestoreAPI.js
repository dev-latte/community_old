import { dbService } from "../fbInstance";

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
export const createData = async (dbCollection, data) => {
    console.log(`Calling status API from ${dbCollection}`);
    await dbService.collection(dbCollection).add(data)
    .catch(error => {
        console.error("Error adding document: ", error);
    });
}

// export const getItemInformation = async ({userObj}) => {
//     console.log(`Item Information! ${process.env.REACT_APP_DB_USER_INVENTORY}`);
//     await dbService.collection(process.env.REACT_APP_DB_USER_INVENTORY)
//         .where("uid", "==", userObj.uid)
//         .get()
//         .then((doc) => {
//             const data = doc.empty ? undefined : doc.docs[0];
//             if (data === undefined ? false : data.exists) {
//                 console.log(data.data().memoryCardId);
//                 return data.data();
//             }
//         }).catch((error) => {
//             console.log("Error getting documents: ", error);
//         });

// }