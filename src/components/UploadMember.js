import React, { useState } from "react";
import { uploadImage } from "../common/StorageAPI";

const UploadMember = () => {
    const [imageFile, setImageFile] = useState("");

    // 데이터 업데이트
    const onSubmit = async (e) => {
        // validation check 필수
        e.preventDefault();
        // upload image
        uploadImage(imageFile);
        try {
            //여기서 e.target.querySelector() 나중에 수정하기
            // 유저의 프로필을 어떻게 저장할지 고민하기
            // const data = {
            //     photoUrl: imageFile,
            //     id: e.target.querySelector(".weapon-id").value,
            // }
            // update data
            // createData(process.env.REACT_APP_DB_MEMORY_CARDS, data);

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
                <legend>멤버 추가</legend>
                {/* 이미지 */}
                <label htmlFor="head">두상 : </label>
                <input type="file" accept="image/*" onChange={onSelectImage} className="head"/>
                <label htmlFor="body">전신 : </label>
                <input type="file" accept="image/*" onChange={onSelectImage} className="body"/>

                {/* 캐릭터 이름 */}
                <label htmlFor="name">이름 : </label>
                <input type="text" className="name" placeholder="이름을 입력해주세요."/>
                {/* 캐릭터 한 줄 평가 */}
                <label htmlFor="simple">한 줄 평가 : </label>
                <input type="text" className="simple" placeholder="이름을 입력해주세요."/>
                {/* 나이 */}
                <label htmlFor="age">나이 : </label>
                <input type="text" className="age" placeholder="나이를 입력해주세요."/>
                {/* 성별 */}
                <label htmlFor="gender">성별 : </label>
                <input type="text" className="gender" placeholder="성별을 입력해주세요."/>
                {/* 키 */}
                <label htmlFor="height">키 : </label>
                <input type="text" className="height" placeholder="키를 입력해주세요."/>
                {/* 외형 */}
                <label htmlFor="appearance">외관 : </label>
                <textarea className="appearance" placeholder="외관을 묘사해주세요."/>
                {/* 성격 */}
                <label htmlFor="personality">성격 : </label>
                <textarea className="personality" placeholder="성격을 입력해주세요."/>
                {/* 특이사항 */}
                <label htmlFor="feature">기타 특이사항 : </label>
                <textarea className="feature" placeholder="기타 특이사항을 입력해주세요."/>
                {/* 비밀설정 */}
                <label htmlFor="secret">비밀설정 : </label>
                <textarea className="secret" placeholder="비밀설정을 입력해주세요."/>
            </fieldset>            
            <input type="submit" value="submit"/>
        </form>
    )
}

export default UploadMember;