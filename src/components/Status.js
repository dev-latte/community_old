import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbInstance";

const Status = ({ userObj }) => {
    const [status, setStatus] = useState({});

    useEffect(() =>{
        let statusData;
        const stateInfo = dbService.collection(process.env.REACT_APP_DB_STATUS).where("uid", "==", userObj.uid);
        stateInfo.get().then((doc) => {
            const data = doc.empty ? undefined : doc.docs[0];
            if (data === undefined ? false : data.exists) {
                statusData = data.data();
                console.log("데이터 존재함", statusData);
            } else {
                statusData = {
                    STR: 1,
                    DEX: 1,
                    INT: 1,
                    LUK: 1,
                    point: 10,
                    uid: userObj.uid
                };
                console.log("데이터 없음", statusData);
                dbService.collection(process.env.REACT_APP_DB_STATUS).add(statusData);
            }
            setStatus(statusData);
        });
    }, []);

    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }
    
    return (
        <>
        <img src={userObj.photoUrl} alt="Profile" />
        <span>{userObj.displayName}</span>
        <div>
            <ul>
                <li>STR: {status.STR}
                    <button>+</button>
                </li>
                <li>DEX: {status.DEX}
                    <button>+</button>
                </li>
                <li>INT: {status.INT}
                    <button>+</button>
                </li>
                <li>LUK: {status.LUK}
                    <button>+</button>
                </li>
                <li>잔여 포인트: {status.point}</li>
            </ul>
        </div>

        <button onClick={onLogoutClick}>Logout</button>
        </>
    )
}


export default Status;