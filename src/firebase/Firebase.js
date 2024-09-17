import { initializeApp } from "firebase/app";
import {  getFirestore,  collection,  doc,  addDoc,  updateDoc,  deleteDoc,} from "firebase/firestore";
import {  getStorage,  ref,  getDownloadURL,  uploadString, uploadBytes,} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyA9rTKqzGiQgu45uW50ZvEuiPpXwghvlJk",
  authDomain: "recipemaster-c0221.firebaseapp.com",
  projectId: "recipemaster-c0221",
  storageBucket: "recipemaster-c0221.appspot.com",
  messagingSenderId: "192189898965",
  appId: "1:192189898965:web:71b4feddd663ab0bb0c25c",
  databaseURL: "https://recipemaster-c0221-default-rtdb.firebaseio.com",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Function to add a recipe to Firestore
export const addRecipe = async (recipeData) => {
  const {
    name,
    ingredients,
    making,
    category,
    images,
    subCategory,
    healthPercentage,
    introduction,
    rating,
    uid,
    likes,
    disLikes,
    userName, 
    userImg,  
    video,
    videoLink,
    addedDate, // Add the current timestamp

  } = recipeData;

  try {
    const storage = getStorage();
    const imageUrls = [];

    for (const image of images) {
      // Generate a unique ID for each image file
      const imageId = uuidv4();

      // the storage reference for the image using the unique ID
      const imageRef = ref(storage, `recipeImages/${imageId}`);

      // Upload the image file to Firebase Storage and set the Content-Type header
      await uploadString(imageRef, image, "data_url", {
        contentType: "image/jpeg",
      });

      // Retrieve the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Push the download URL to the array
      imageUrls.push(imageUrl);
    }

    // Generate a unique ID for the video file
    const videoId = uuidv4();

    // the storage reference for the video using the unique ID
    const videoRef = ref(storage, `recipeVideos/${videoId}`);

    // Upload the video file to Firebase Storage
    await uploadBytes(videoRef, video);

    // Retrieve the download URL of the uploaded video
    const videoUrl = await getDownloadURL(videoRef);

    // Add recipe data to Firestore with the image URLs and video URL
    const recipeRef = await addDoc(collection(db, "recipes"), {
      name,
      ingredients,
      making,
      category,
      imageUrls,
      subCategory,
      healthPercentage,
      introduction,
      rating,
      likes,
      disLikes,
      uid,
      userName, 
      userImg,  
      videoUrl, // Store the video URL instead of the video file itself
      videoLink,
    addedDate, // Add the current timestamp

    });
    console.log("Recipe added successfully ");
  } catch (error) {
    console.error("Error adding recipe: ", error);
  }
};
// Function to remove a recipe from Firestore
export const removeRecipe = async (recipeId) => {
  try {
    await deleteDoc(doc(db, "recipes", recipeId));
    console.log("Recipe removed successfully");
  } catch (error) {
    console.error("Error removing recipe: ", error);
  }
};
// Function to update a recipe in Firestore
export const updateRecipe = async (recipeId, updatedRecipeData, fieldTobeUpdated ) => {
  try {
    await updateDoc(doc(db, "recipes", recipeId), {
      [fieldTobeUpdated]: updatedRecipeData,
    });

    console.log(`${fieldTobeUpdated} updated successfully`);
  } catch (error) {
    console.error("Error updating recipe: ", error);
  }
};