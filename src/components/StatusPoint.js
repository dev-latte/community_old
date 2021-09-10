import React, { useEffect, useState } from "react";
import { statusAPI } from "../common/StatusAPI";
import { dbService } from "../fbInstance";

const StatusPoint = ({ userObj }) => {
    const [status, setStatus] = useState({});

    useEffect(() =>{
        statusAPI({ userObj }, process.env.REACT_APP_DB_STATUS);
        onRealtimeStatus();
    }, []);

    const onRealtimeStatus = async () => {
        await dbService.collection(process.env.REACT_APP_DB_STATUS).doc(userObj.uid)
            .onSnapshot((snap) => {
                const data = snap.data();
                if(!data) { return; } 
                // To do : 레벨업 구간 책정하기
                if(100 <= data.exp) {
                    console.log("level up!");
                    dbService.collection(process.env.REACT_APP_DB_STATUS).doc(userObj.uid).update({
                        level: data.level+1,
                        exp: 0,
                        point: data.point+3
                    });
                }
                console.log("update status", snap.data());
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
            <>
            <div>Level: {status.level}</div>
            <div>exp: {status.exp}</div>
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
            </>
            }
        </div>
        
    )
}

export default StatusPoint;