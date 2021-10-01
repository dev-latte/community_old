import React, {useEffect, useState } from "react";
import { createData, firebaseAPI, getUserItemInfo } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
import "./Inventory.css";

const UtilInventory = ({userObj}) => {
    const [isOn, setIsOn] = useState(false);
    const [userInventory, setUserInventory] = useState({});

    useEffect(() => {
        getUserInformation();
    }, []);

    const getUserInformation = async () => {
        await getUserItemInfo(userObj.uid, process.env.REACT_APP_DB_USER_INVENTORY).then(doc =>{
            if(doc.exists) {
                const memoryCard = doc.data().memoryCardId;
                const itemId = doc.data().itemId;
                setUserInventory([
                            ...memoryCard,
                            ...itemId
                ]);
            } else {
                const initInventoryData = {
                    itemId: [],
                    memoryCardId: [],
                    uid: userObj.uid
                };
                // 여기부터... 
                createData(userObj.uid, process.env.REACT_APP_DB_USER_INVENTORY, initInventoryData);
            }
        });
    }

    const onOpenInventory = async () => {
        if(!isOn){
            await getUserInformation();
        }
        onLoadScreen(userObj.uid, userInventory);
        setIsOn(!isOn);
    }

    return (
        <div className="util-inventory" >
            <div className="inventory-btn" >
                <box-icon name='briefcase-alt-2' onClick={onOpenInventory}/>
            </div>
        </div>
    )
}

export default UtilInventory;