import React, { useEffect, useState } from "react";
import { dbService } from "../fbInstance";

const StatusPoint = ({ userObj }) => {
    const [status, setStatus] = useState({});

    useEffect(() =>{
        onStatusData();
        onRealtimeStatus();
    }, []);

    const onStatusData = async () => {
        let statusData;
        await dbService
            .collection(process.env.REACT_APP_DB_STATUS)
            .where("uid", "==", userObj.uid)
            .get()
            .then((doc) => {
                const data = doc.empty ? undefined : doc.docs[0];
                if (data === undefined ? false : data.exists) {
                    statusData = data.data();
                    console.log("데이터 존재함", statusData);
                } else {
                    statusData = {
                        STR: 1,
                        INT: 1,
                        DEF: 1,
                        MR: 1,
                        DEX: 1,
                        AGI: 1,
                        LUK: 1,
                        point: 10,
                        uid: userObj.uid
                    };
                    console.log("데이터 없음", statusData);
                    dbService.collection(process.env.REACT_APP_DB_STATUS).doc(userObj.uid).set(statusData);
                }
            setStatus(statusData);
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    const onRealtimeStatus = async () => {
        await dbService.collection(process.env.REACT_APP_DB_STATUS).doc(userObj.uid)
            .onSnapshot((snap) => {
                setStatus(snap.data());
            });
    }

    const onClickPlus = async (e) => {
        if(status.point < 1) { return; }
        const statusRef = dbService.collection(process.env.REACT_APP_DB_STATUS).doc(userObj.uid);
        const {target: {value}} = e;
        onSetStatusOnFb(value, statusRef);
    }

    // 반복되는 코드 - 수정고려
    const onSetStatusOnFb = (value, statusRef) => {
        if(value === "str"){
            statusRef.update({
                STR: status.STR+1,
                point: status.point-1
            });
        } else if(value === "int") {
            statusRef.update({
                INT: status.INT+1,
                point: status.point-1
            });
        } else if(value === "def") {
            statusRef.update({
                DEF: status.DEF+1,
                point: status.point-1
            });
        } else if(value === "mr") {
            statusRef.update({
                MR: status.MR+1,
                point: status.point-1
            });
        } else if(value === "dex"){
            statusRef.update({
                DEX: status.DEX+1,
                point: status.point-1
            });
        } else if(value === "agi") {
            statusRef.update({
                AGI: status.AGI+1,
                point: status.point-1
            });
        } else if(value === "luk") {
            statusRef.update({
                LUK: status.LUK+1,
                point: status.point-1
            })
        }
    }

    return (
        <div>
            {status &&
            <ul>
                <li>STR: { status.STR }
                    {status.point !== 0 && <button onClick={onClickPlus} value="str">+</button>}
                </li>
                <li>INT: {status.INT}
                    {status.point !== 0 && <button onClick={onClickPlus} value="int">+</button>}
                </li>
                <li>DEF: {status.DEF}
                    {status.point !== 0 && <button onClick={onClickPlus} value="def">+</button>}
                </li>
                <li>MR: {status.MR}
                    {status.point !== 0 && <button onClick={onClickPlus} value="mr">+</button>}
                </li>
                <li>DEX: {status.DEX}
                    {status.point !== 0 && <button onClick={onClickPlus} value="dex">+</button>}
                </li>
                <li>AGI: {status.AGI}
                    {status.point !== 0 &&<button onClick={onClickPlus} value="agi">+</button>}
                </li>
                <li>LUK: {status && status.LUK}
                    {status.point !== 0 && <button onClick={onClickPlus} value="luk">+</button>}
                </li>
                <li>잔여 포인트: {status.point}</li>
            </ul>
            }
        </div>
        
    )
}

export default StatusPoint;