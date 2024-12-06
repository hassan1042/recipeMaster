import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export const addComment = async (commentText, recipeId, uid ) => {
    const recipeRef = await addDoc(collection(db, `recipes/${recipeId}/comment`), {
       comment: commentText,
       uid
      });
      console.log("comment added successfully ");
  
}
export const deleteComment = async (recipeId, commentId) => {
    try {
      const commentRef = doc(db, `recipes/${recipeId}/comment`, commentId);
      await deleteDoc(commentRef);
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };
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
