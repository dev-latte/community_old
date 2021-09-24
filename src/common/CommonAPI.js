// open inventory
export const openInventory = (className) => {
    document.querySelector(className).classList.toggle("on");
}

// open item information
export const onToggleItemInformation = () => {
    console.log(document.querySelector(".item-modal").classList.toggle("hidden"));
}

// close item information
export const onCloseItemInformation = () => {
    document.querySelector(".item-modal").classList.add("hidden");
}


