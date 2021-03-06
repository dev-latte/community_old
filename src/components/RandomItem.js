import React, { Fragment, useState } from "react";
import { getMemoryCardInfoForRandom } from "../common/FirestoreAPI";

const RandomItem = ({userObj}) => {
    const [memoryCard, setMemoryCard] = useState(null);
    const onClickEvent = (e) => {
        const grade = isGradeCheck(Math.random() * 100);
        getMemoryCardInfoForRandom(userObj.uid, process.env.REACT_APP_DB_MEMORY_CARDS, grade).then(data => {
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
        <div className="main">
            <button onClick={onClickEvent}>1회 뽑기!</button>
            <div>
                {memoryCard && <Fragment>
                                <img src={memoryCard.photoUrl} alt="memoryCard_img" />
                                <div>{memoryCard.name}</div>
                                <div>{memoryCard.grade}</div>
                                <div>{memoryCard.hp}</div>
                                <div>{memoryCard.atk}</div>
                                <div>{memoryCard.int}</div>
                                <div>{memoryCard.def}</div>
                                <div>{memoryCard.dex}</div>
                                <div>{memoryCard.agi}</div>
                                <div>{memoryCard.luk}</div>
                                </Fragment>
                }
            </div>
        </div>
    )
}

export default RandomItem;