import React, {useEffect, useState } from "react";
import { createData, getUserItemInfo } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
// import { onLoadScreen } from "../common/Inventory";
import "../common/Inventory.css";

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
                createData(userObj.uid, process.env.REACT_APP_DB_USER_INVENTORY, initInventoryData);
            }
        });
    }

    const openInventory = async (e) => {
        const test = React.createRef();
        console.log(test);
        if(!isOn){
            await getUserInformation();
        }
        onLoadScreen(userObj.uid, userInventory);
        setIsOn(!isOn);
    }

    return (
        <div className="util-inventory" >
            <div className="inventory-btn" >
                <box-icon name='briefcase-alt-2' onClick={openInventory}/>
            </div>
        </div>
    )
}

export default UtilInventory;