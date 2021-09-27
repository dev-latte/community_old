import React, { useState } from "react";
import { createDataWithoutUid } from "../common/FirestoreAPI";
import { uploadImage } from "../common/StorageAPI";

const UploadMemoryCard = () => {
    const [imageFile, setImageFile] = useState("");

    // 데이터 업데이트
    const onSubmit = async (e) => {
        // validation check 필수
        e.preventDefault();
        // upload image
        uploadImage(imageFile, "memoryCard");
        try {
            //여기서 e.target.querySelector() 나중에 수정하기
            const data = {
                photoUrl: imageFile,
                id: e.target.querySelector(".weapon-id").value,
                grade: e.target.querySelector(".weapon-grade").value,
                name: e.target.querySelector(".weapon-name").value,
                hp: Number(e.target.querySelector(".weapon-hp").value),
                atk: Number(e.target.querySelector(".weapon-atk").value),
                def: Number(e.target.querySelector(".weapon-def").value),
                int: Number(e.target.querySelector(".weapon-int").value),
                dex: Number(e.target.querySelector(".weapon-dex").value),
                agi: Number(e.target.querySelector(".weapon-agi").value),
                luk: Number(e.target.querySelector(".weapon-luk").value)
            }
            // update data
            createDataWithoutUid(process.env.REACT_APP_DB_MEMORY_CARDS, data);

            onClearInputForm(e);
            setImageFile("");
        }catch(error){
            console.log(error);
        }
    }

    // 이미지 선택관련
    const onSelectImage = (e) => {
        const { target: {files} } = e;
        const file = files[0];
        if(file !== undefined){
            const reader = new FileReader();
            reader.onload = (finishedEvent) => {
                const {currentTarget: { result } } = finishedEvent;
                setImageFile(result);
            };
            reader.readAsDataURL(file);    
        }
    }

    const onClearInputForm = (e) => {
        e.target.querySelectorAll("input[type=text]").forEach(input => {
            input.value="";
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>메모리카드 추가</legend>
                {/* 아이템 이미지 */}
                <label htmlFor="weapon-image">이미지 : </label>
                <input type="file" accept="image/*" onChange={onSelectImage} className="weapon-image" placeholder="메모리카드의 사진을 업로드 해주세요."/>
                {/* 아이템 아이디 */}
                <label htmlFor="weapon-id">ID : </label>
                <input type="text" className="weapon-id" placeholder="아이디를 입력해주세요."/>
                {/* 아이템 등급 */}
                <label htmlFor="weapon-grade">RANK : </label>
                <input type="text" className="weapon-grade" placeholder="등급을 입력해주세요."/>
                {/* 아이템 이름 */}
                <label htmlFor="weapon-name">NAME : </label>
                <input type="text" className="weapon-name" placeholder="이름을 입력해주세요."/>
                {/* 아이템 능력치 - HP */}
                <label htmlFor="weapon-name">HP : </label>
                <input type="text" className="weapon-hp" placeholder="HP를 입력해주세요."/>
                {/* 아이템 능력치 - ATK */}
                <label htmlFor="weapon-name">ATK : </label>
                <input type="text" className="weapon-atk" placeholder="ATK를 입력해주세요."/>
                {/* 아이템 능력치 - DEF */}
                <label htmlFor="weapon-name">DEF : </label>
                <input type="text" className="weapon-def" placeholder="DEF를 입력해주세요."/>
                {/* 아이템 능력치 - INT */}
                <label htmlFor="weapon-name">INT : </label>
                <input type="text" className="weapon-int" placeholder="INT를 입력해주세요."/>
                {/* 아이템 능력치 - DEX */}
                <label htmlFor="weapon-name">DEX : </label>
                <input type="text" className="weapon-dex" placeholder="DEX를 입력해주세요."/>
                {/* 아이템 능력치 - AGI */}
                <label htmlFor="weapon-name">AGI : </label>
                <input type="text" className="weapon-agi" placeholder="AGI를 입력해주세요."/>
                {/* 아이템 능력치 - LUK */}
                <label htmlFor="weapon-name">LUK : </label>
                <input type="text" className="weapon-luk" placeholder="LUK을 입력해주세요."/>
            </fieldset>            
            <input type="submit" value="submit"/>
        </form>
    )
}

export default UploadMemoryCard;