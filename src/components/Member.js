import React, { useEffect, useState } from "react";
import { disarmEquipmentData, getAllData, getUserItemInfo, updateEquipmentData } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
import { dbService } from "../fbInstance";
import "./Member.css"

const Member = ({userObj}) => {
    const [memberList, setMemberList] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [equipmentInfo, setEquipmentInfo] = useState({});

    useEffect(() => {
        onGetMemberData();
        onCurrentEquipment();
    }, []);

    const onGetMemberData = async () => {
        await getAllData(process.env.REACT_APP_DB_MEMBER_LIST).then((doc) => {
            if(!doc.empty) {
                setMemberList(doc.docs.map(data => {
                    return data.data();
                }));
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    const onSelectCharacter = async (e) => {
        const character = document.querySelector(".character");

        const {target : { className }} = e;
        setMemberInfo(Array.from(memberList).filter(member => className === member.name)[0]);

        character.classList.add("on");
        document.querySelector(".member-list").classList.remove("on")
    }

    const onCloseCharaterInfo = () => {
        document.querySelector(".character").classList.remove("on");
        document.querySelector(".member-list").classList.add("on");
    }

    const selectEquipment = async (e) => {
        const target = e.target.className;
        if(target === "weapon" || target === "armor" || target === "jewelry"){
            await getUserItemInfo(userObj.uid, process.env.REACT_APP_DB_USER_INVENTORY).then(doc => {
                if(doc.exists) {
                    onLoadScreen(userObj.uid, doc.data().memoryCardId.filter(card => card.id.split("-")[2] === e.target.classList[0][0].toUpperCase()));
                }
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        } else if(target.split("-").length === 4){
            // 아이템 정보창 셋팅함
            const itemInfo = equipmentInfo[target.split("-")[2] === "W" ? "weapon" : target.split("-")[2] === "A" ? "armor" : "jewelry"];
            let modal = e.target.parentNode.parentNode.querySelectorAll(".item-modal");
            if(modal.length !== 0){
                modal = e.target.parentNode.parentNode.querySelector(".item-modal");
                modal.remove();
                console.log("modal exist");
            }
            modal = document.createElement("div");
            modal.setAttribute("class", "item-modal");
            modal.style.left = `${e.clientX}px`;
            modal.style.top = `${e.clientY}px`;

            const info = document.createElement("div");
            info.setAttribute("class", "item-information");
    
            const name = document.createElement("h4");
            name.setAttribute("class", "item-name");
            name.innerText = itemInfo.name;
    
            const grade = document.createElement("h4");
            grade.setAttribute("class", "item-grade");
            grade.innerText = itemInfo.grade

            const status = document.createElement("span");
            status.setAttribute("class", "item-status");
            status.innerText = `ATK : ${itemInfo.atk}
                                INT : ${itemInfo.int}
                                HP : ${itemInfo.hp}
                                DEF : ${itemInfo.def}
                                DEX : ${itemInfo.dex}
                                AGI : ${itemInfo.agi}
                                LUK : ${itemInfo.luk}`;
    
            const closeBtn = document.createElement("span");
            closeBtn.setAttribute("class", "close");
            closeBtn.innerText = "X";
    
            const useBtn = document.createElement("button");
            useBtn.setAttribute("class", "disarm");
            useBtn.innerText = "해제";

            info.appendChild(name);
            info.appendChild(grade);
            info.appendChild(status);
            info.appendChild(closeBtn);
            info.appendChild(useBtn);
            modal.appendChild(info);
            e.target.parentNode.appendChild(modal);
        } else if(target === "close") {
            e.target.parentNode.parentNode.remove();
        } else if(target === "disarm") {
            // 해제버튼 이벤트
            const key = e.target.parentNode.parentNode.parentNode.className;
            disarmEquipmentData(userObj.uid, process.env.REACT_APP_DB_USER_EQUIPMENT, key);
        }
    }

    const onCurrentEquipment = async () => {
        const character = document.querySelector(".character");
        await dbService.collection(process.env.REACT_APP_DB_USER_EQUIPMENT).doc(userObj.uid).onSnapshot((snap) => {
            if(snap.exists){
                const equipment = snap.data();
                setEquipmentInfo(equipment);
                character.childNodes.item(1).childNodes.forEach(el => {
                    const kinds = el.className;
                    const equipmentItem = document.querySelector(`.${kinds}`);
                    equipmentItem.innerHTML = (Object.keys(equipment[kinds]).length !== 0) 
                                            ? `<img src="${equipment[kinds].photoUrl}" class="${equipment[kinds].id}"/>`
                                            : "";
                });
            };
        });
    }

    return (
        <div className="main">
            {memberList && 
                <div className="member-list on">
                    {memberList.map((member, index) => 
                    <div key={index} className="member">
                        <div onClick={onSelectCharacter}><img src={member.head} className={member.name} alt={member.name}/></div>
                        <div>{member.name}</div>
                    </div>
                    )}
                </div>
            }
            <div className="character">
                <div className="chracter-body">
                { memberInfo && <img src={memberInfo.body} alt={memberInfo.name} /> }
                </div>
                <div className="character-equip">
                    <div className="weapon" onClick={selectEquipment}></div>
                    <div className="armor" onClick={selectEquipment}></div>
                    <div className="jewelry" onClick={selectEquipment}></div>
                </div>
                <button className="close" onClick={onCloseCharaterInfo}>close</button>
            </div>
        </div>
    )
}

export default Member;