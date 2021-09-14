import React, { useState } from "react";
import { getMemoryCardInfo } from "../common/FirestoreAPI";

const RandomItem = ({userObj}) => {
    const [memoryCard, setMemoryCard] = useState({});

    const onClickEvent = (e) => {
        const grade = isGradeCheck(Math.random() * 100);
        getMemoryCardInfo(userObj.uid, process.env.REACT_APP_DB_MEMORY_CARDS, grade).then(data => {
            if(data !== undefined || data) {
                setMemoryCard(data);
            }
        });
    }

    const isGradeCheck = (rate) => {
        if(rate <= process.env.REACT_APP_RANDOM_ITEM_PERCENTAGE_S) return "S";
        if(rate <= process.env.REACT_APP_RANDOM_ITEM_PERCENTAGE_A) return "A";
        if(rate <= process.env.REACT_APP_RANDOM_ITEM_PERCENTAGE_B) return "B";
        if(rate <= process.env.REACT_APP_RANDOM_ITEM_PERCENTAGE_C) return "C";
        if(rate <= process.env.REACT_APP_RANDOM_ITEM_PERCENTAGE_F) return "F";
    }

    return (
        <>
            <button onClick={onClickEvent}>1회 뽑기!</button>
            <div>
                {memoryCard && <>
                                <div>{memoryCard.name}</div>
                                <div>{memoryCard.grade}</div>
                                <div>{memoryCard.hp}</div>
                                <div>{memoryCard.atk}</div>
                                <div>{memoryCard.int}</div>
                                <div>{memoryCard.def}</div>
                                <div>{memoryCard.dex}</div>
                                <div>{memoryCard.agi}</div>
                                <div>{memoryCard.luk}</div>
                                </>
                                }
            </div>
        </>
    )
}

export default RandomItem;