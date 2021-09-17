import React, { useState } from "react";
import { createDataWithoutUid } from "../common/FirestoreAPI";
import { authService, firebaseInstance } from "../fbInstance";

const Authentication = () => {
    const [error, setError] = useState("");

    const onSocialLoginClick = async (e) => {
        const provider = new firebaseInstance.auth.TwitterAuthProvider();
        try{
            const result = await authService.signInWithPopup(provider).then(data => {
                return data.additionalUserInfo.profile;
            });
            createDataWithoutUid(process.env.REACT_APP_DB_TWITTER_INFO, result);
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <div>
            <button name="twitter_login" className="twitter_login_btn" onClick={onSocialLoginClick}>
                Continue with Twitter
            </button>
            {error && <span className="authError">{error}</span>}
        </div>

    )
}

export default Authentication;