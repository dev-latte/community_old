import React, { useState } from "react";
import { firebaseAPI } from "../common/FirestoreAPI";

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
            luk: 2
        }],
        itemId: []
    }

    const [userInventory, setUserInventory] = useState(defaultInventory);
    const [isOn, setIsOn] = useState(false);

    const onOpenInventory = async () => {
        await firebaseAPI({userObj}, process.env.REACT_APP_DB_USER_INVENTORY, defaultInventory).then(doc => {
            setUserInventory(doc);
        });
        setIsOn(true);
    }

    const onCloseInventory = () => {
        setIsOn(false);
    }

    return (
        <>
            <button onClick={onOpenInventory}>Open</button>
            <button onClick={onCloseInventory}>Close</button>
            {(userInventory && isOn) && userInventory.memoryCardId.map((memoryCard, index) => 
                <div key={index}>
                    {memoryCard.id}<br/>
                    {memoryCard.name}
                </div>)}
        </>
    )
}

export default Inventory;