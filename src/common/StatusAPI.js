import { dbService } from "../fbInstance";

export const statusAPI = async ({userObj}, dbCollection) => {
    console.log(`Calling status API from ${dbCollection}`);
    return await dbService.collection(dbCollection)
        .where("uid", "==", userObj.uid)
        .get()
        .then((doc) => {
            const data = doc.empty ? undefined : doc.docs[0];
            if (data === undefined ? false : data.exists) {
                return data.data();
            } else {
                dbService.collection(dbCollection).doc(userObj.uid).set({
                    level: 1,
                    exp: 0,
                    hp: 50,
                    def: 1,
                    atk: 1, // 공격
                    int: 1, // 버프 및 힐링
                    dex: 1, // 회피
                    agi: 1, // 크리티컬 확률
                    luk: 1, // 크리티컬 피해량 & 랜덤 치명타
                    point: 10,
                    uid: userObj.uid
                });
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
}