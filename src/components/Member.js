import React from "react";
import "./Member.css"

const Member = () => {
    // const onSelectCharacter = (e) => {
    //     document.querySelector(".character").classList.add("on");
    //     document.querySelector(".button").classList.add("on");
    // }
    return (
        <div className="main">
            {/* 멤버 리스트
            1. DB에서 멤버 정보 가져오기
            멤버리스트 > 사진 클릭 > 캐릭터 사진나옴 > 캐릭터 정보가 나옴 > 여기서 전환하면 캐릭터 장착화면으로
            클로즈버튼 만들기
            */}
            {/* <button onClick={onSelectCharacter} className="button">member Page</button>
            <div className="character">
                <div className="character-equip">
                    <div className="weapon">
                    </div>
                    <div className="armor">
                    </div>
                    <div className="accessary">
                    </div>
                </div>
                <img src="https://firebasestorage.googleapis.com/v0/b/community-62908.appspot.com/o/member%2F1.png?alt=media&token=ee975d99-fe0c-4b77-b3be-40d0579d5331" alt="" />
            </div> */}
        </div>
    )
}

export default Member;