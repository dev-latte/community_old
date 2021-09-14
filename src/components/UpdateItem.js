import React, { useState } from "react";

import { createData } from "../common/FirestoreAPI";
import { uploadImage } from "../common/StorageAPI";

const UpdateItem = ({ userObj }) => {
    const [imageFile, setImageFile] = useState("");

    // 데이터 업데이트
    const onSubmit = async (e) => {
        // validation check 필수
        e.preventDefault();
        uploadImage(imageFile);
        console.log(imageFile);
        try {

            //여기서 e.target.querySelector() 나중에 수정하기
            const data = {
                photoUrl: imageFile,
                id: e.target.querySelector(".weapon-id").value,
                grade: Number(e.target.querySelector(".weapon-grade").value),
                name: e.target.querySelector(".weapon-name").value,
                hp: Number(e.target.querySelector(".weapon-hp").value),
                atk: Number(e.target.querySelector(".weapon-atk").value),
                def: Number(e.target.querySelector(".weapon-def").value),
                int: Number(e.target.querySelector(".weapon-int").value),
                dex: Number(e.target.querySelector(".weapon-dex").value),
                agi: Number(e.target.querySelector(".weapon-agi").value),
                luk: Number(e.target.querySelector(".weapon-luk").value)
            }

            createData(process.env.REACT_APP_DB_MEMORY_CARDS, data);

            // reset page
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
            </fieldset>            
            <input type="submit" value="submit"/>
        </form>
    )
}

export default UpdateItem;