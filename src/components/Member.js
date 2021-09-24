import React, { Fragment, useEffect, useState } from "react";
import { getAllData, getUserItemInfo } from "../common/FirestoreAPI";
import { onLoadScreen } from "../common/Inventory";
import "./Member.css"

const Member = ({userObj}) => {
    const [memberList, setMemberList] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);

    useEffect(() => {
        onGetMemberData();
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
        const {target : { className }} = e;
        setMemberInfo(Array.from(memberList).filter(member => className === member.name)[0]);

        document.querySelector(".character").classList.add("on");
        document.querySelector(".member-list").classList.remove("on")
    }

    const onCloseCharaterInfo = () => {
        document.querySelector(".character").classList.remove("on");
        document.querySelector(".member-list").classList.add("on");
    }

    const selectEquipment = async (e) => {
        await getUserItemInfo(userObj.uid, process.env.REACT_APP_DB_USER_INVENTORY).then(doc => {
            if(doc.exists) {
                onLoadScreen(doc.data().memoryCardId.filter(card => card.id.split("-")[2] === e.target.classList[0][0].toUpperCase()));
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    return (
        <div className="main">
            {memberList && 
                <div className="member-list on">
                    {memberList.map((member, index) => 
                    <div key={index} className="member" onClick={onSelectCharacter}>
                        <img src={member.head} className={member.name} alt={member.name}/>
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
                    <div className="accessary" onClick={selectEquipment}></div>
                </div>
                <button className="close" onClick={onCloseCharaterInfo}>close</button>
            </div>
        </div>
    )
}

export default Member;