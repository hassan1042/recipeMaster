import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export function listenForRecipes(setRecipes, setFilteredRecipes, setDataAvail) {
  const recipesCollection = collection(db, "recipes");

  const unsubscribe = onSnapshot(recipesCollection, (snapshot) => {
    const recipesArray = [];
    snapshot.forEach((doc) => {
      recipesArray.push({ id: doc.id, ...doc.data() });
    });
    setRecipes(recipesArray);
    setFilteredRecipes(recipesArray);
    setDataAvail(true);
    console.log("Recipes retrived successfully");
  });

  return unsubscribe;
}
