import React, { Fragment, useEffect, useState } from "react";
import { getAllData, getMemberData } from "../common/FirestoreAPI";
import "./Member.css"

const Member = () => {
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

        if(!document.querySelector(".character").classList.contains("on")){
            document.querySelector(".character").classList.add("on");
        }
        if(document.querySelector(".member-list").classList.contains("on")){
            document.querySelector(".member-list").classList.remove("on");
        }
    }

    const onCloseCharaterInfo = () => {
        if(document.querySelector(".character").classList.contains("on")){
            document.querySelector(".character").classList.remove("on");
        }
        if(!document.querySelector(".member-list").classList.contains("on")){
            document.querySelector(".member-list").classList.add("on");
        }
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
            {/* 멤버 리스트
            1. DB에서 멤버 정보 가져오기
            멤버리스트 > 사진 클릭 > 캐릭터 사진나옴 > 캐릭터 정보가 나옴 > 여기서 전환하면 캐릭터 장착화면으로
            클로즈버튼 만들기
            */}            
                <div className="character">
                    <div className="chracter-body">
                    { memberInfo && <img src={memberInfo.body} alt={memberInfo.name} /> }
                    </div>
                    <div className="character-equip">
                        <div className="weapon">
                        </div>
                        <div className="armor">
                        </div>
                        <div className="accessary">
                        </div>
                    </div>
                    <button className="close" onClick={onCloseCharaterInfo}>close</button>
                </div>
        </div>
    )
}

export default Member;