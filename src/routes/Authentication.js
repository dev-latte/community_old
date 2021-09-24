import React, { useState } from "react";
import { createData } from "../common/FirestoreAPI";
import { authService, firebaseInstance } from "../fbInstance";

const Authentication = () => {
    const [error, setError] = useState("");

    const onSocialLoginClick = async () => {
        const provider = new firebaseInstance.auth.TwitterAuthProvider();
        try{
            const result = await authService.signInWithPopup(provider).then(data => {
                return data;
            });
            createData(result.user.uid, process.env.REACT_APP_DB_TWITTER_INFO, result.additionalUserInfo.profile);
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