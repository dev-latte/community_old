import { dbService } from "../fbInstance";

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
                dbService.collection(dbCollection).doc(userObj.uid).set(defaultData);
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
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