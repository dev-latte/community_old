// 1
export const onLoadScreen = (userInformation) => {
    const main = document.querySelector(".main-page");
    const screen = document.createElement("div");
    screen.setAttribute("class", "mask");
    screen.addEventListener("click", (e) => {
        if(e.target === screen) {
            screen.remove();
        }
    });

    const inventory = document.createElement("div");
    inventory.setAttribute("class", "inventory");

    createInventory(userInformation).forEach(div => {
        inventory.appendChild(div);
    });

    screen.appendChild(inventory);    
    main.appendChild(screen);
}

// 2
const createInventory = (userInformation) => {
    return userInformation.map((item, index) => {
        const div = document.createElement("div");
        div.setAttribute("key", index);
        div.setAttribute("class", "item");
        div.addEventListener("click", (e) => {
            const inventory = e.currentTarget.parentElement;
            const openModal = Array.from(inventory.children).filter(div => div.classList.contains("item-modal"));
            inventory.appendChild(modalItemInformation(e, item, openModal));
        });

        const img = document.createElement("img");
        img.setAttribute("src", item.photoUrl);
        img.setAttribute("className", item.id);
        div.appendChild(img);
        
        return div;
    });
}


const createItemInfomation = (e, item, openModal) => {
    let info, name, grade, status, closeBtn;
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
    } else {
        const modal = e.currentTarget.parentElement.querySelector(".item-information");
        info = modal;
        name = modal.querySelector(".item-name");
        grade = modal.querySelector(".item-grade");
        status = modal.querySelector(".item-status");
        closeBtn = modal.querySelector(".close");
    }

    // close btn
    closeBtn.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
    });

    name.innerText = item.name;
    grade.innerText = item.grade
    status.innerText = `ATK : ${item.atk}
                        INT : ${item.int}
                        HP : ${item.hp}
                        DEF : ${item.def}
                        DEX : ${item.dex}
                        AGI : ${item.agi}
                        LUK : ${item.luk}`;
    closeBtn.innerText = "X";

    info.appendChild(name);
    info.appendChild(grade);
    info.appendChild(status);
    info.appendChild(closeBtn);

    return info;
}

// 3
const modalItemInformation = (e, item, openModal) => {
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
    modal.appendChild(createItemInfomation(e, item, openModal));
 
    return modal;
    // const count = information.length; // 나중에 여러개 소지 가능한 아이템이나올경우
}
