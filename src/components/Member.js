import React, { useEffect, useState } from "react";
import { firebaseAPI, getAllData, getUserItemInfo } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
import { dbService } from "../fbInstance";
import "./Member.css"

const Member = ({userObj}) => {
    const [memberList, setMemberList] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);

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
        if(e.target.className !== ""){
            await getUserItemInfo(userObj.uid, process.env.REACT_APP_DB_USER_INVENTORY).then(doc => {
                if(doc.exists) {
                    onLoadScreen(userObj.uid, doc.data().memoryCardId.filter(card => card.id.split("-")[2] === e.target.classList[0][0].toUpperCase()));
                }
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        } else {
            console.log("equip!")
            // 아이템 정보 띄우기 여기에 창 띄우는거해야함
        }
    }

    const onCurrentEquipment = async () => {
        const character = document.querySelector(".character");
        await dbService.collection(process.env.REACT_APP_DB_USER_EQUIPMENT).doc(userObj.uid).onSnapshot((snap) => {
            if(snap.exists){
                const equipment = snap.data();
                character.childNodes.item(1).childNodes.forEach(el => {
                    const kinds = el.className;
                    if(Object.keys(equipment[kinds]).length !== 0) {
                        const equipmentItem = document.querySelector(`.${kinds}`);
                        equipmentItem.innerHTML = `<img src="${equipment[kinds].photoUrl}">`;
                        // 착용중인 장비 이미지 클릭 시 
                    }
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