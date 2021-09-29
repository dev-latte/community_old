import React, { Fragment, useEffect, useState } from "react";
import { firebaseAPI } from "../common/FirestoreAPI";
import { dbService } from "../fbInstance";

const StatusPoint = ({ userObj }) => {
    // To Do : init data 따로 모아두기
    const initStatus = {
        level: 1,
        exp: 0,
        hp: 50,
        def: 1, // 방어력
        atk: 1, // 공격
        int: 1, // 버프 및 힐링
        dex: 1, // 회피
        agi: 1, // 크리티컬 확률
        luk: 1, // 크리티컬 피해량 & 랜덤 치명타
        point: 10,
        uid: userObj.uid
    };

    const [status, setStatus] = useState(initStatus);
    const [equipment, setEquipment] = useState({
        hp: 0,
        def: 0,
        atk: 0,
        int: 0,
        dex: 0,
        agi: 0,
        luk: 0,
    });

    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            // init status
            firebaseAPI({ userObj }, process.env.REACT_APP_DB_STATUS, status);
            onRealtimeStatus();
            initEquipment();
            onCurrentEquipment();
        }
        return () => isSubscribed = false;
    }, []);

    const onRealtimeStatus = async () => {
        try{
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
        }catch(error){
            console.log(error);
        }
    }

    // init user eqiupment
    // 유저 장착 정보가 없으면 초기화, 있으면 데이터값을 가져온다.
    const initEquipment = async () => {
        await firebaseAPI({ userObj }, process.env.REACT_APP_DB_USER_EQUIPMENT, {
            uid: userObj.uid,
            weapon: {},
            armor: {},
            jewelry: {}
            }).then(data => {
                const equipmentStatus = {};
                for(let key in data) {
                    if(key !== "uid"){
                        const dataObj = data[key];
                        if(Object.keys(dataObj).length !== 0) {
                            for(let key in equipment) {
                                equipmentStatus[key] = (equipmentStatus[key] === undefined ? 0 : equipmentStatus[key]) + dataObj[key];
                            }
                        }
                    }
                }
                setEquipment(equipmentStatus);
            }).catch(error => {
                console.log(`init Equipment Error ${error}`);
            });
    }

    // 착용정보가 변하면 적용되는 데이터도 변한다.
    const onCurrentEquipment = async () => {
        await dbService.collection(process.env.REACT_APP_DB_USER_EQUIPMENT).doc(userObj.uid).onSnapshot((snap) => {
            if(snap.exists){
                const data = snap.data();
                const equipmentStatus = {};
                for(let key in data) {
                    if(key !== "uid"){
                        const dataObj = data[key];
                        if(Object.keys(dataObj).length !== 0) {
                            for(let key in equipment) {
                                equipmentStatus[key] = (equipmentStatus[key] === undefined ? 0 : equipmentStatus[key]) + dataObj[key];
                            }
                        }
                    }
                }
                setEquipment(equipmentStatus);
            }
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
            <Fragment>
            <div>Level: {status.level}</div>
            <div>exp: {status.exp}</div>
            <div>HP: {status.hp * status.level}</div>
            <div>공격력: {status.atk * 10}</div>
            <div>방어력: {status.def * 5}</div>
            <ul>
                <li>ATK: { status.atk } {equipment.atk !== 0 && <span>( +{ equipment.atk })</span> }
                    {status.point !== 0 && <button onClick={onClickPlus} value="atk">+</button>}
                </li>
                <li>INT: {status.int} {equipment.int !== 0 && <span>( +{ equipment.int })</span> }
                    {status.point !== 0 && <button onClick={onClickPlus} value="int">+</button>}
                </li>
                <li>DEF: {status.def} {equipment.def !== 0 && <span>( +{ equipment.def })</span> }
                    {status.point !== 0 && <button onClick={onClickPlus} value="def">+</button>}
                </li>
                <li>DEX: {status.dex} {equipment.dex !== 0 && <span>( +{ equipment.dex })</span> }
                    {status.point !== 0 && <button onClick={onClickPlus} value="dex">+</button>}
                </li>
                <li>AGI: {status.agi} {equipment.agi !== 0 && <span>( +{ equipment.agi })</span> }
                    {status.point !== 0 &&<button onClick={onClickPlus} value="agi">+</button>}
                </li>
                <li>LUK: {status.luk} {equipment.luk !== 0 && <span>( +{ equipment.luk })</span> }
                    {status.point !== 0 && <button onClick={onClickPlus} value="luk">+</button>}
                </li>
                <li>잔여 포인트: {status.point}</li>
            </ul>
            </Fragment>
            }
        </div>
        
    )
}

export default StatusPoint;