import React from "react";
import { useHistory } from "react-router";
import { authService } from "../fbInstance";
import "./Logout.css";

const Logout = () => {
    const history = useHistory();
    const onLogoutClick = () => {
        if(window.confirm("정말로 로그아웃 하시겠습니까?")){
            authService.signOut();
            history.push("/");
        }
    }
    return (
        <div className="logout" onClick={onLogoutClick}>
            <box-icon name='log-out' id="log-out"/>
        </div>
    );
}

export default Logout;