import { utilsFirebase } from "../../config/plugins/firebase.plugin.js";


export class UploadFileService {

    static async uploadToFirebase (path, data) {
        const imgRef = utilsFirebase.ref(utilsFirebase.storage, path)
        await utilsFirebase.uploadBytes(imgRef, data)

        return await utilsFirebase.getDownloadURL(imgRef)
    }
}