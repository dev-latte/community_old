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
        document.querySelector(".inventory").classList.toggle("on");

        onCloseItemInformation();
    }

    const onGetItemInformation = (e) => {
        const information = userInventory.memoryCardId.filter(memoryCard => memoryCard.id === e.target.className);

        const modal = document.querySelector(".item-modal");
        modal.style.left = `${e.clientX}px`;
        modal.style.top = `${e.clientY}px`;
        modal.appendChild(onCreateItemInformation(information[0]));
        
        if(modal.classList.contains("hidden")) {
            modal.classList.remove("hidden");
        }
        
        // const count = information.length; // 나중에 여러개 소지 가능한 아이템이나올경우
    }

    const onCreateItemInformation = (information, e) => {
        const itemInfo = document.querySelector(".item-information");
        
        const name = document.querySelector(".item-name");
        const grade = document.querySelector(".item-grade");
        const info = document.querySelector(".item-statust");
        
        name.innerHTML = information.name;
        grade.innerHTML = information.grade;
        info.innerHTML = `ATK : ${information.atk}<br>
                        INT : ${information.int}<br>
                        HP : ${information.hp}<br>
                        DEF : ${information.def}<br>
                        DEX : ${information.dex}<br>
                        AGI : ${information.agi}<br>
                        LUK : ${information.luk}<br>`;

        itemInfo.appendChild(name);
        itemInfo.appendChild(grade);
        itemInfo.appendChild(info);

        return itemInfo;
    }

    const onCloseItemInformation = () => {
        document.querySelector(".item-modal").classList.add("hidden");
    }

    return (
        <>
            <div className="inventory-btn">
                <box-icon name='briefcase-alt-2' onClick={onOpenInventory} />
            </div>
            {userInventory &&
                <div className="inventory">
                    { userInventory.memoryCardId.map((memoryCard, index) => 
                        <div key={index} className="item" onClick={onGetItemInformation}>
                        <img src={memoryCard.photoUrl} alt="" className={memoryCard.id}/>
                        </div>
                    )}   
                    <div className="item-modal hidden">
                        <div className="item-information">
                            <h4 className="item-name"/>
                            <h4 className="item-grade"/>
                            <div className="item-statust"/>
                        </div>
                        {/* 버튼을 어떤식으로할지 고민 더 하기 */}
                        <button onClick={onCloseItemInformation}>close</button>
                    </div>
                </div>}
        </>
    )
}

export default Inventory;