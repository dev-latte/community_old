import { updateEquipmentData } from "./FirestoreAPI";
// 1
export const onLoadScreen = (uid, information) => {
    const main = document.querySelector(".main-page");
    const screen = document.createElement("div");
    screen.setAttribute("class", "mask");
    // add event
    screen.addEventListener("click", (e) => {
        if(e.target === screen) {
            screen.remove();
        }
    });

    const inventory = document.createElement("div");
    inventory.setAttribute("class", "inventory");

    createInventory(uid, information).forEach(div => {
        inventory.appendChild(div);
    });

    screen.appendChild(inventory);    
    main.appendChild(screen);
}

// 2
const createInventory = (uid, information) => {
    return information.map((item, index) => {
        const div = document.createElement("div");
        div.setAttribute("key", index);
        div.setAttribute("class", "item");
        // add event
        div.addEventListener("click", (e) => {
            const inventory = e.currentTarget.parentElement;
            const openModal = Array.from(inventory.children).filter(div => div.classList.contains("item-modal"));
            inventory.appendChild(modalItemInformation(e, item, openModal, uid));
        });

        const img = document.createElement("img");
        img.setAttribute("src", item.photoUrl);
        img.setAttribute("class", item.id);
        div.appendChild(img);
        
        return div;
    });
}

// 3
const modalItemInformation = (e, item, openModal, uid) => {
    let modal;
    if(openModal.length === 0) {
        modal = document.createElement("div");
        modal.setAttribute("class", "item-modal");
    } else {
        modal = e.currentTarget.parentElement.querySelector(".item-modal");
    }

    // style
    modal.style.left = `${e.clientX}px`;
    modal.style.top = `${e.clientY}px`;
    modal.appendChild(createItemInfomation(e, item, openModal, uid));
 
    return modal;
    // const count = information.length; // 나중에 여러개 소지 가능한 아이템이나올경우
}

// 4
const createItemInfomation = (e, item, openModal, uid) => {
    let info, name, grade, status, closeBtn, useBtn;
    if(openModal.length === 0) {
        info = document.createElement("div");
        info.setAttribute("class", "item-information");

        name = document.createElement("h4");
        name.setAttribute("class", "item-name");

        grade = document.createElement("h4");
        grade.setAttribute("class", "item-grade");

        status = document.createElement("span");
        status.setAttribute("class", "item-status");

        closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", "close");

        useBtn = document.createElement("button");
        useBtn.setAttribute("class", "use");
    } else {
        const modal = e.currentTarget.parentElement.querySelector(".item-information");
        info = modal;
        name = modal.querySelector(".item-name");
        grade = modal.querySelector(".item-grade");
        status = modal.querySelector(".item-status");
        closeBtn = modal.querySelector(".close");
        useBtn = modal.querySelector(".use");
    }

    // close btn
    closeBtn.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
    });

    name.innerText = item.name;
    if(item.id.split("-")[0] === "CARD") {
        grade.innerText = item.grade;
        status.innerText = `ATK : ${item.atk}
                            INT : ${item.int}
                            HP : ${item.hp}
                            DEF : ${item.def}
                            DEX : ${item.dex}
                            AGI : ${item.agi}
                            LUK : ${item.luk}`;
        useBtn.innerText = "장착";
    } else {
        useBtn.innerText = "사용";
        grade.innerText = item.kinds;
        status.innerText = `효능 : ${item.ability}
                            설명 : ${item.subscription}`;
    }
    closeBtn.innerText = "X";

    // 착용하기, 사용하기 구분짓기 > 이벤트 함수를 따로 빼서 작업?? 어떻게할까나...
    useBtn.addEventListener("click", (e) => {
        console.log(item);
        // 만약 인벤토리창으로 열린거면 장착버튼을 붙이지 않는쪽으로
        if(e.target.innerText === "장착"){
            updateEquipmentData(uid, process.env.REACT_APP_DB_USER_EQUIPMENT, item);
        } else if(e.target.innerText === "사용") {
            console.log("사용");
        }

        // remove mask
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
    });
    console.log("check");

    info.appendChild(name);
    info.appendChild(grade);
    info.appendChild(status);
    info.appendChild(closeBtn);
    info.appendChild(useBtn);

    return info;
}