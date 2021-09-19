import React, { useState } from "react";
import { createDataWithoutUid } from "../common/FirestoreAPI";
import { uploadImage } from "../common/StorageAPI";

const UploadMember = ({userObj}) => {
    const [headFile, setHeadFile] = useState("");
    const [bodyFile, setBodyFile] = useState("");

    // 데이터 업데이트
    const onSubmit = async (e) => {
        // validation check 필수
        e.preventDefault();
        const {target : { elements } } = e;
        const list = Array.from(elements).filter((el) => el.className !== "");
        
        uploadImage(headFile, "member");
        uploadImage(bodyFile, "member");
        
        try {
            let data = {
                head: headFile,
                body: bodyFile,
                uid: userObj.uid
            }
            list.filter(el => el.className !== 'body' && el.className !== 'head').forEach(tag => { data[tag.className] = tag.value; });
            
            // update data
            createDataWithoutUid(process.env.REACT_APP_DB_MEMBER_LIST, data);
            
            onClearInputForm(e);
            setHeadFile("");
            setBodyFile("");
        }catch(error){
            console.log(error);
        }
    }

    // 이미지 선택관련
    const onSelectImage = (e) => {
        const { target: {files, className} } = e;
        const file = files[0];
        if(file !== undefined){
            const reader = new FileReader();
            reader.onload = (finishedEvent) => {
                const {currentTarget: { result } } = finishedEvent;
                (className === "head") ? setHeadFile(result) : setBodyFile(result);
            };
            reader.readAsDataURL(file);    
        }
    }

    const onClearInputForm = (e) => {
        e.target.querySelectorAll("input[type=text]").forEach(input => {
            input.value="";
        });
        e.target.querySelectorAll("input[type=file]").forEach(input => {
            input.value="";
        });
        e.target.querySelectorAll("textarea").forEach(textarea => {
            textarea.value="";
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