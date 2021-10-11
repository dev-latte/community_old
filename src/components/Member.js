import React, { useEffect, useState } from "react";
import { disarmEquipmentData, getAllData, getUserItemInfo } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
import { dbService } from "../fbInstance";
import "./Member.css"

const Member = ({userObj}) => {
    // 직접적인 DOM조작은 피해야한다.
    // DOM요소에 엑세스하고 클래스를 추가하는 대신, React 컴포넌트 내부의 상태를 유지하고, 해당 상태를 사용하여 클래스 컴포넌트에 추가해야한다.
    // 리액트 컴포넌트에 맞게 리팩토링 꼭 하기
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
            console.log(equipmentInfo);

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
                console.log("equip", equipment);
                setEquipmentInfo(equipment);
                if(character.children.item(4) !== null) {
                    character.childNodes.item(4).childNodes.forEach(el => {
                        const kinds = el.className;
                        const equipmentItem = document.querySelector(`.${kinds}`);
                        console.log(equipment[kinds].id);
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
        // TODO 반복된 코드 > 수정 필요
        console.log(equipmentInfo)
        if(Array.from(characterDiv.childNodes).filter(el => el.classList.contains("character-equip")).length === 0) {
            const characterEquipDiv = document.createElement("div");
            characterEquipDiv.setAttribute("class", "character-equip");

            const weapon = document.createElement("div");
            weapon.setAttribute("class", "weapon");
            if(Object.keys(equipmentInfo.weapon).length !== 0){
                const img = document.createElement("img");
                img.setAttribute("src", equipmentInfo.weapon.photoUrl);
                img.setAttribute("class", equipmentInfo.weapon.id);
                weapon.appendChild(img);
            }
            weapon.addEventListener("click", (e) => {selectEquipment(e)});
    
            const armor = document.createElement("div");
            armor.setAttribute("class", "armor");
            if(Object.keys(equipmentInfo.armor).length !== 0){
                const img = document.createElement("img");
                img.setAttribute("src", equipmentInfo.armor.photoUrl);
                img.setAttribute("class", equipmentInfo.armor.id);
                armor.appendChild(img);
            }
            armor.addEventListener("click", (e) => {selectEquipment(e)});
    
            const jewelry = document.createElement("div");
            jewelry.setAttribute("class", "jewelry");
            if(Object.keys(equipmentInfo.jewelry).length !== 0) {
                const img = document.createElement("img");
                img.setAttribute("src", equipmentInfo.jewelry.photoUrl);
                img.setAttribute("class", equipmentInfo.jewelry.id);
                jewelry.appendChild(img);
            }
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
                    <span className="concept-btn" onClick={onCharacterConcept}>캐릭터 설정</span>
                    {isOwner && <span className="equipment-btn" onClick={onCharacterEquipment}>장비창</span>}           
                </div>
                {memberInfo && 
                <div className="character-concept">
                    <div className="concept">
                        <div className="simple">
                            <h3>"{memberInfo.simple}"</h3>
                        </div>

                        <div className="appearance">
                            <h4>{memberInfo.name}</h4>
                            <p>{memberInfo.gender}</p>
                            <p>{memberInfo.age}</p>
                            <p>{memberInfo.height}</p>
                            <p>{memberInfo.appearance}</p>
                        </div>

                        <div className="feature">
                            <p>{memberInfo.personality}</p>
                            <p>{memberInfo.feature}</p>
                        </div>
                        
                        <div className="secret">
                            <p>{memberInfo.secret}</p>
                        </div>
                        
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