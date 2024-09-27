import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export const addComment = async (commentText, recipeId, uid ) => {
    const recipeRef = await addDoc(collection(db, `recipes/${recipeId}/comment`), {
       comment: commentText,
       uid
      });
      console.log("comment added successfully ");
  
}
export function ListenForComments(setComments, recipeId) {
    const commentsCollection = collection(db, `recipes/${recipeId}/comment`);

    const unsubscribe = onSnapshot(commentsCollection, (snapshot) => {
        const commentsArray = [];
        snapshot.forEach((doc) => {
            commentsArray.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentsArray);
           });

    return unsubscribe;
}
