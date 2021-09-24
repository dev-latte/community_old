import React, {useEffect, useState } from "react";
import { getUserItemInfo } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
import "./Inventory.css";

const UtilInventory = ({userObj}) => {
    const [isOn, setIsOn] = useState(false);
    const [userInventory, setUserInventory] = useState([]);

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
            }
        });
    }

    const onOpenInventory = async () => {
        if(!isOn){
            await getUserInformation();
        }
        onLoadScreen(userInventory);
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