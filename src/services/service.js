import { addDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";


export const createUser = async (name, uid) => {

    const docRef = await addDoc(collection(db, "users"), {
        name,
        uid,
        isCompleted: false,
    });
    console.log("Document written with ID: ", docRef.id);
    return doc

} 