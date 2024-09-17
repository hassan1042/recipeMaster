import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export function AddToFavourites(id, uid, name, ) {
    console.log(name)
    // Add a document to the "Favourites" collection with the provided ID and user ID
   return addDoc(collection(db, `users/${uid}/Favourites`), {
    id: id, 
    name: name,
})

    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log("Document written with ID: ", docRef.name);
        // return docRef.name; // Return the ID of the newly added document if needed
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        throw error;
    });
}


export function ListenForFavourites(setFavourites, uid) {
    const recipesCollection = collection(db, `users/${uid}/Favourites`);

    const unsubscribe = onSnapshot(recipesCollection, (snapshot) => {
        const favouritesArray = [];
        snapshot.forEach((doc) => {
            favouritesArray.push({ id: doc.id, ...doc.data() });
        });
        // console.log(favouritesArray);
        setFavourites(favouritesArray);
        // setFilteredRecipes(recipesArray);
        // setDataAvail(true);
    });

    return unsubscribe;
}