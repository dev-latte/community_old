import React, { useState } from "react";
import { firebaseAPI } from "../common/FirestoreAPI";

import "./Inventory.css"

const Inventory = ({userObj}) => {
    const defaultInventory = {
        uid: userObj.uid,
        memoryCardId: [{
            id: "CARD-F01-C-001",
            grade: 100,
            name: "F급",
            hp: 5,
            atk: 2,
            def: 0,
            int: 2,
            dex: 0,
            agi: 0,
            luk: 2,
            photoUrl:""
        }],
        itemId: []
    }

    const [userInventory, setUserInventory] = useState(defaultInventory);
    const [isOn, setIsOn] = useState(false);

    const onOpenInventory = async () => {
        if(!isOn) {
            await firebaseAPI({userObj}, process.env.REACT_APP_DB_USER_INVENTORY, defaultInventory).then(doc => {
                setUserInventory(doc);
            });    
        }
        setIsOn(!isOn);
    }

    const onGetItemInformation = (e) => {
        const information = userInventory.memoryCardId.filter(memoryCard => memoryCard.id === e.target.className);
        // 정보가져오는것까진 ok, 이걸 설명창으로 뛰워야함... 후에 css를 이용해서 작업하기
        console.log(information);
    }

    return (
        <>
            <button onClick={onOpenInventory}>Inventory Open</button>
            {(userInventory && isOn) && userInventory.memoryCardId.map((memoryCard, index) => 
                <div key={index} className="item" onClick={onGetItemInformation}>
                    <img src={memoryCard.photoUrl} alt="" className={memoryCard.id}/>
                </div>)}
        </>
    )
}

export default Inventory;