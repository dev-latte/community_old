import React, { useEffect, useState } from "react";
import { statusAPI } from "../common/StatusAPI";
import { dbService } from "../fbInstance";

const StatusPoint = ({ userObj }) => {
    const [status, setStatus] = useState({});

    useEffect(() =>{
        onRealtimeStatus();
        statusAPI({ userObj }, process.env.REACT_APP_DB_STATUS);
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
        if(value === "atk"){
            statusRef.update({
                atk: status.atk+1,
                point: status.point-1
            });
        } else if(value === "int") {
            statusRef.update({
                int: status.int+1,
                point: status.point-1
            });
        } else if(value === "def") {
            statusRef.update({
                def: status.def+1,
                point: status.point-1
            });
        } else if(value === "dex"){
            statusRef.update({
                dex: status.dex+1,
                point: status.point-1
            });
        } else if(value === "agi") {
            statusRef.update({
                agi: status.agi+1,
                point: status.point-1
            });
        } else if(value === "luk") {
            statusRef.update({
                luk: status.luk+1,
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
            <div>HP: {status.hp}</div>
            <div>공격력: {status.atk * 10}</div>
            <div>방어력: {status.def * 5}</div>
            <ul>
                <li>ATK: { status.atk }
                    {status.point !== 0 && <button onClick={onClickPlus} value="atk">+</button>}
                </li>
                <li>INT: {status.int}
                    {status.point !== 0 && <button onClick={onClickPlus} value="int">+</button>}
                </li>
                <li>DEF: {status.def}
                    {status.point !== 0 && <button onClick={onClickPlus} value="def">+</button>}
                </li>
                <li>DEX: {status.dex}
                    {status.point !== 0 && <button onClick={onClickPlus} value="dex">+</button>}
                </li>
                <li>AGI: {status.agi}
                    {status.point !== 0 &&<button onClick={onClickPlus} value="agi">+</button>}
                </li>
                <li>LUK: {status && status.luk}
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