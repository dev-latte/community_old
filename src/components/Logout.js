import React from "react";
import { useHistory } from "react-router";
import { authService } from "../fbInstance";

const Logout = () => {
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <button onClick={onLogoutClick}>Logout</button>
    );
}

export default Logout;