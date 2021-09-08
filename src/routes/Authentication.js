import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbInstance";

const Authentication = () => {
    const [error, setError] = useState("");
    const onSocialLoginClick = async (e) => {

        const provider = new firebaseInstance.auth.TwitterAuthProvider();
        try{
            // 나중에 기존 유저(DB에 등록 되어 있는 아이디(displayName)) 아니면 로그인 못하게 설정해야함
            // userId를 가져와서 셋팅... > 보류
            const userId = await authService.signInWithPopup(provider).then((userCredential) => userCredential.additionalUserInfo);
            // console.log(userId);
        }catch(error){
            // 로그인 실패 및 거부
            setError(error.message);
        }

    }

    return (
        <>
            <div>
                <button name="twitter_login" className="twitter_login_btn" onClick={onSocialLoginClick}>
                    Continue with Twitter
                </button>
                {error && <span className="authError">{error}</span>}
            </div>
        </>
    )
}

export default Authentication;