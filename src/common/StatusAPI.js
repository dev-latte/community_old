import React from "react";
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
                    STR: 1,
                    INT: 1,
                    DEF: 1,
                    MR: 1,
                    DEX: 1,
                    AGI: 1,
                    LUK: 1,
                    point: 10,
                    uid: userObj.uid
                });
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
}