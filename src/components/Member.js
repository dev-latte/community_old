import React, { Fragment, useEffect, useState } from "react";
import { openInventory } from "../common/CommonAPI";
import { getAllData, getUserItemInfo } from "../common/FirestoreAPI";
import "./Member.css"

const Member = ({userObj}) => {
    // 여기에도 인벤토리 붙여야함...쾅쾅
    const [memberList, setMemberList] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [userItems, setUserItems] = useState([]);

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
        onCloseInfo();

    }

    const selectEquipment = async (e) => {
        await getUserItemInfo(userObj.uid, process.env.REACT_APP_DB_USER_INVENTORY).then(doc => {
            if(doc.exists) {
                setUserItems(doc.data().memoryCardId.filter(card => card.id.split("-")[2] === e.target.classList[0][0].toUpperCase()));
            }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
        openInventory(".character .inventory");
    }

    const onGetItemInformation = (e) => {
        const modal = document.querySelector(".character .item-modal");
        modal.style.left = `${e.clientX}px`;
        modal.style.top = `${e.clientY}px`;
        modal.appendChild(setItemInformation(e));
        
        if(modal.classList.contains("hidden")) {
            modal.classList.remove("hidden");
        }
        // const count = information.length; // 나중에 여러개 소지 가능한 아이템이나올경우
    }

    const setItemInformation = (e) => {
        const inventory = e.target.parentNode.parentNode;
        const itemInfo = userItems.filter(item => item.id === e.target.className)[0];
        
        const info = inventory.querySelector(".item-modal .item-information");
        
        const name = info.querySelector(".item-name");
        const grade = info.querySelector(".item-grade");
        const status = info.querySelector(".item-statust");

        name.innerHTML = itemInfo.name;
        grade.innerHTML = itemInfo.grade;
        status.innerHTML = `ATK : ${itemInfo.atk}<br>
                            INT : ${itemInfo.int}<br>
                            HP : ${itemInfo.hp}<br>
                            DEF : ${itemInfo.def}<br>
                            DEX : ${itemInfo.dex}<br>
                            AGI : ${itemInfo.agi}<br>
                            LUK : ${itemInfo.luk}<br>`;
    
        info.appendChild(name);
        info.appendChild(grade);
        info.appendChild(status);

        return info;
    }

    const onCloseInfo = () => {
        const modal = document.querySelector(".character .item-modal");
        modal.classList.add("hidden");
    }


    return (
        <div className="main">
            {memberList && 
            <Fragment>
                <div className="member-list on">
                    {memberList.map((member, index) => 
                    <div key={index} className="member" onClick={onSelectCharacter}>
                        <img src={member.head} className={member.name} alt={member.name}/>
                        <div>{member.name}</div>
                    </div>
                    )}
                </div>
            </Fragment>
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

                {userItems &&
                <div className="inventory">
                    {
                    userItems.map((item, index) => 
                        <div key={index} className="item" onClick={onGetItemInformation}>
                            <img src={item.photoUrl} alt={item.name} className={item.id}/>
                        </div>
                    )
                    }
                    <div className="item-modal hidden">
                        <div className="item-information">
                            <h4 className="item-name"></h4>
                            <h4 className="item-grade"></h4>
                            <div className="item-statust"/>
                        </div>
                        <span onClick={onCloseInfo}>X</span>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Member;