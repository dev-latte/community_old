import { storageService } from "../fbInstance";
import { v4 as uuidv4 } from "uuid"

export const uploadImage = async(imageFile, storageName) => {
    if(imageFile !== ""){
        const imageFileRef = storageService.ref().child(`${storageName}/${uuidv4()}`);
        const response = await imageFileRef.putString(imageFile, "data_url");
        await response.ref.getDownloadURL();
    }
}