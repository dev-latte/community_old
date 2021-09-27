import React, { useState } from "react";
import { createDataWithoutUid } from "../common/FirestoreAPI";
import { uploadImage } from "../common/StorageAPI";

const UpdateItem = () => {
    const [imageFile, setImageFile] = useState("");

    // 데이터 업데이트
    const onSubmit = async (e) => {
        // validation check 필수
        e.preventDefault();
        uploadImage(imageFile, "item");
        try {

            //여기서 e.target.querySelector() 나중에 수정하기
            const data = {
                photoUrl: imageFile,
                id: e.target.querySelector(".item-id").value,
                kinds: e.target.querySelector(".item-kinds").value,
                name: e.target.querySelector(".item-name").value,
                ability: e.target.querySelector(".item-efficacy").value,
                subscription: e.target.querySelector(".item-subscription").value
            }

            createDataWithoutUid(process.env.REACT_APP_DB_ITEMS, data);

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
                <legend>아이템 추가</legend>
                {/* 아이템 이미지 */}
                <label htmlFor="item-image">이미지 : </label>
                <input type="file" accept="image/*" onChange={onSelectImage} className="item-image" placeholder="아이템의 사진을 업로드 해주세요."/>
                {/* 아이템 아이디 */}
                <label htmlFor="item-id">ID : </label>
                <input type="text" className="item-id" placeholder="아이디를 입력해주세요."/>
                {/* 아이템 종류 */}
                <label htmlFor="item-kinds">KINDS : </label>
                <input type="text" className="item-kinds" placeholder="아이템 종류를 입력해주세요."/>
                {/* 아이템 이름 */}
                <label htmlFor="item-name">NAME : </label>
                <input type="text" className="item-name" placeholder="아이템 이름을 입력해주세요."/>
                {/* 아이템 효능 */}
                <label htmlFor="item-efficacy">EFFICACY : </label>
                <input type="text" className="item-efficacy" placeholder="아이템 효과를 입력해주세요."/>
                {/* 아이템 설명 */}
                <label htmlFor="item-subscription">SUBSCRIPTION : </label>
                <input type="text" className="item-subscription" placeholder="아이템 설명을 입력해주세요."/>                          
            </fieldset>            
            <input type="submit" value="submit"/>
        </form>
    )
}

export default UpdateItem;