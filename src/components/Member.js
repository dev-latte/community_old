import React, { useEffect, useState } from "react";
import { disarmEquipmentData, getAllData, getUserItemInfo, updateEquipmentData } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
import { dbService } from "../fbInstance";
import "./Member.css"

const Member = ({userObj}) => {
    const [memberList, setMemberList] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [equipmentInfo, setEquipmentInfo] = useState({});
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            onGetMemberData();
            onCurrentEquipment();
        }
        return () => isSubscribed = false;
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
        const selectedCharacter = Array.from(memberList).filter(member => className === member.name)[0];
        setMemberInfo(selectedCharacter);

        if (selectedCharacter.uid === userObj.uid) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }

        character.classList.add("on");
        document.querySelector(".member-list").classList.remove("on")
    }

    const onCloseCharaterInfo = (e) => {
        const characterDiv = e.target.parentNode;
        characterDiv.classList.remove("on");
        characterDiv.parentNode.childNodes[0].classList.add("on");

        if(characterDiv.childNodes[1].classList.contains("hidden")) { 
            characterDiv.childNodes[1].classList.remove("hidden"); 
        }

        if(!characterDiv.childNodes[4].classList.contains("hidden")){
            characterDiv.childNodes[4].classList.add("hidden");
        }
    }

    const selectEquipment = async (e) => {
        console.log(e);
        const target = e.target.className;
        console.log(target)
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
                if(character.children.item(4) !== null) {
                    character.childNodes.item(4).childNodes.forEach(el => {
                        const kinds = el.className;
                        const equipmentItem = document.querySelector(`.${kinds}`);
                        equipmentItem.innerHTML = (Object.keys(equipment[kinds]).length !== 0) 
                                                ? `<img src="${equipment[kinds].photoUrl}" class="${equipment[kinds].id}"/>`
                                                 : "";
                    });    
                }
            };
        });
    }

    const onCharacterConcept = (e) => {
        const characterDiv = e.target.parentNode.parentNode;
        if(characterDiv.childNodes[1].classList.contains("hidden")) {
            characterDiv.childNodes[1].classList.remove("hidden");
            characterDiv.childNodes[4].classList.add("hidden");
        }
    }

    const onCharacterEquipment = (e) => {
        const characterDiv = e.target.parentNode.parentNode;
        if(Array.from(characterDiv.childNodes).filter(el => el.classList.contains("character-equip")).length !== 0) {
            if(characterDiv.childNodes[4].classList.contains("hidden")) {
                characterDiv.childNodes[4].classList.remove("hidden");
            }    
        }
        characterDiv.childNodes[1].classList.add("hidden");
        // create equipment
        onCreateEquipElement(e, characterDiv);
    }

    const onCreateEquipElement = (e, characterDiv) => {
        if(Array.from(characterDiv.childNodes).filter(el => el.classList.contains("character-equip")).length === 0) {
            const characterEquipDiv = document.createElement("div");
            characterEquipDiv.setAttribute("class", "character-equip");

            const weapon = document.createElement("div");
            weapon.setAttribute("class", "weapon");
            weapon.addEventListener("click", (e) => {selectEquipment(e)});
    
            const armor = document.createElement("div");
            armor.setAttribute("class", "armor");
            armor.addEventListener("click", (e) => {selectEquipment(e)});
    
            const jewelry = document.createElement("div");
            jewelry.setAttribute("class", "jewelry");
            jewelry.addEventListener("click", (e) => {selectEquipment(e)});

            characterEquipDiv.appendChild(weapon);
            characterEquipDiv.appendChild(armor);
            characterEquipDiv.appendChild(jewelry);

            characterDiv.appendChild(characterEquipDiv);
        }
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
                <div className="character-btns">
                    <button className="concept-btn" onClick={onCharacterConcept}>캐릭터 설정</button>
                    {isOwner && <button className="equipment-btn" onClick={onCharacterEquipment}>장비창</button>}           
                </div>
                {memberInfo && 
                <div className="character-concept">
                    <div className="concept">
                        <h1>{memberInfo.name}</h1>
                        <h3>{memberInfo.simple}</h3>
                        <p>{memberInfo.gender}</p>
                        <p>{memberInfo.age}</p>
                        <p>{memberInfo.appearance}</p>
                        <p>{memberInfo.height}</p>
                        <p>{memberInfo.personality}</p>
                        <p>{memberInfo.secret}</p>
                    </div>
                </div>
                }  
                <div className="chracter-body">
                { memberInfo && <img src={memberInfo.body} alt={memberInfo.name} /> }
                </div>
                <button className="close" onClick={onCloseCharaterInfo}>close</button>
            </div>
        </div>
    )
}

export default Member;