import React, { Fragment, useEffect, useState } from "react";
import { firebaseAPI } from "../common/FirestoreAPI";
import { EQUIP, EQUIP_STAT_POINT, LEVEL_UP_POINT, STATUS } from "../data/DefaultData";
import { dbService } from "../fbInstance";

const StatusPoint = ({ userObj }) => {
    const [status, setStatus] = useState(STATUS);
    const [equipment, setEquipment] = useState(EQUIP_STAT_POINT);

    // status DB관련 코드 리팩토링 / useffect에서 처음 로딩때만 이
    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            firebaseAPI({ userObj }, process.env.REACT_APP_DB_STATUS, status);
            initEquipment();
        }
        onRealtimeStatus();
        onRealtimeStatustPointEquip();
        
        return () => isSubscribed = false;
    }, []);

    // init user eqiupment
    const initEquipment = async () => {
        await firebaseAPI({ userObj }, process.env.REACT_APP_DB_USER_EQUIPMENT, EQUIP.uid = userObj.uid).then(data => {
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

    // level up check
    const onRealtimeStatus = async () => {
        try{
            await dbService.collection(process.env.REACT_APP_DB_STATUS).doc(userObj.uid)
            .onSnapshot((snap) => {
                const data = snap.data();
                if(!data) { return; } 
                if(LEVEL_UP_POINT[data.level] <= data.exp) {
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

    // 착용정보가 변하면 적용되는 데이터도 변한다.
    const onRealtimeStatustPointEquip = async () => {
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
        updateStatusInformation(value, statusRef);
    }

    const updateStatusInformation = (value, statusRef) => {
        const statusChange = status;
        statusChange[value] = status[value] + 1;
        statusChange["point"] = status["point"] -1;
        statusRef.update(statusChange);
    }

    return (
        <div>
        {/* // TODO 반복 코드 처리 */}
            {status &&
                <Fragment>
                <div>Level: {status.level}</div>
                <div>exp: {status.exp}</div>
                <div>HP: {status.hp * status.level}</div>
                <div>공격력: {status.atk * 10}</div>
                <div>방어력: {status.def * 5}</div>
                <ul>
                    <li>ATK: { status.atk } {equipment.atk > 0 && <span>( +{ equipment.atk })</span> }
                        {status.point !== 0 && <button onClick={onClickPlus} value="atk">+</button>}
                    </li>
                    <li>INT: {status.int} {equipment.int > 0 && <span>( +{ equipment.int })</span> }
                        {status.point !== 0 && <button onClick={onClickPlus} value="int">+</button>}
                    </li>
                    <li>DEF: {status.def} {equipment.def > 0 && <span>( +{ equipment.def })</span> }
                        {status.point !== 0 && <button onClick={onClickPlus} value="def">+</button>}
                    </li>
                    <li>DEX: {status.dex} {equipment.dex > 0 && <span>( +{ equipment.dex })</span> }
                        {status.point !== 0 && <button onClick={onClickPlus} value="dex">+</button>}
                    </li>
                    <li>AGI: {status.agi} {equipment.agi > 0 && <span>( +{ equipment.agi })</span> }
                        {status.point !== 0 &&<button onClick={onClickPlus} value="agi">+</button>}
                    </li>
                    <li>LUK: {status.luk} {equipment.luk > 0 && <span>( +{ equipment.luk })</span> }
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