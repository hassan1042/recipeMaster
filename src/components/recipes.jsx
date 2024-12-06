import React, { useState, useEffect } from "react";
import { addRecipe } from "../firebase/Firebase";
import DialogueBoxMessage from "./common/dialogueBox/DialogueBoxMessage";
import ScrollToTopOnMount from "./common/scrollToTop/ScrollToTopOnMount";
import LoginPage from "./Login";
import { useAuth } from "../hookx/use-Auth";
import { serverTimestamp } from "firebase/firestore";
import CatAndSub from "./recipeAddition/CatAndSub";
import Health from "./recipeAddition/Health";
import ImgVidLink from "./recipeAddition/ImgVidLink";
import TopSection from "./recipeAddition/TopSection";

function Recipes() {

 
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [making, setMaking] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [healthPercentage, setHealthPercentage] = useState();
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [disLikes, setDisLikes] = useState(0);
  const [video, setVideo] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [recipeAdded, setRecipeAdded] = useState(false);
  

  useEffect(() => {
    const totalScore = fats + proteins + carbohydrates;
    const maxPossibleScore = 300;
    const percentage = (totalScore / maxPossibleScore) * 100;
    setHealthPercentage(percentage.toFixed());
  }, [fats, proteins, carbohydrates]);
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <LoginPage />;
  }
  const uid = currentUser ? currentUser.uid : null;

  const userName = currentUser.displayName;
  const userImg = currentUser.photoURL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images && fats && carbohydrates && proteins) {
      setLoading(true); // Set loading to true when submission starts
      try {
        await addRecipe({
          name,
          ingredients,
          making,
          category,
          images,
          subCategory,
          healthPercentage,
          introduction,
          rating,
          likes,
          disLikes,
          uid,
          userName,
          userImg,
          video,
          videoLink,
          // addedDate : { seconds: Math.floor(Date.now() / 1000) }, 
        addedDate: serverTimestamp(), // Add the current timestamp
        });
        
        setRecipeAdded(true);
      } catch (error) {
        console.error('Error adding recipe:', error);
      } finally {
        setLoading(false); // Set loading to false when submission ends
      }
      setName("");
      setIngredients("");
      setMaking("");
      setIntroduction("");
      setImages("");
      setCategory(null);
      setFats("");
      setVideoLink("");
    } else {
      alert('Please provide all the necessary information!!!');
      return;
    }
  };
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const uploadedImages = [];
  
    if (selectedFiles.length === 0) {
      setImages([]);
      return;
    }
  
    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadedImages.push(reader.result);
        if (uploadedImages.length === selectedFiles.length) {
          setImages(uploadedImages);
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };
  
  const handleVideoChange = (e) => {
    if (e.target.files.length > 0) {
      setVideo(e.target.files[0]); // Store the first video file
    }
  };
  const normalizeIngredient = (ingredient) => {
    return ingredient.toLowerCase().trim().replace(/[^\w\s]/gi, '');
  };
  


  

  return (
  <div className="pt-36">
    {
      currentUser && (
        <div> 
    <ScrollToTopOnMount/>
     {
      (recipeAdded) ? <div>
      <DialogueBoxMessage 
                isRecipeVisible={recipeAdded}
                 setIsRecipeVisible={setRecipeAdded} 
                dialogueMessage={" Recipe Added successfully"}  /> 
      </div> :
     
  
<div className=" bg-neutral-200 dark:bg-cardDark dark:text-text px-2 md:px-4 lg:px-8 py-0">
       
        <form className="pb-2" onSubmit={handleSubmit} >
        {/** Name Intro Ing Assem */}
        <TopSection
        name={name} setName={setName} introduction={introduction} setIntroduction={setIntroduction} ingredients={ingredients} setIngredients={setIngredients} normalizeIngredient={normalizeIngredient} making={making} setMaking={setMaking} 

        />
          {/* Categories Sub Cats */}
          <CatAndSub 
           setCategory={setCategory}
           setSubCategory={setSubCategory}
          />
        
          {/* The Images video and video link*/}

          <ImgVidLink
          handleImageChange={handleImageChange} handleVideoChange={handleVideoChange} videoLink={videoLink} setVideoLink={setVideoLink}
          />

          {/* the health percentage */}
        <Health
        fats={fats} setFats={setFats} carbohydrates={carbohydrates} setCarbohydrates={setCarbohydrates} proteins={proteins} setProteins={setProteins}
        />
          {/* The Add Recipe button */}
          <div className="text-center">
        <button
          className="py-2 -auto m-3 px-4 rounded-lg text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 shadow-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Adding Recipe...' : 'Add Your Recipe'}
        </button>
      </div>
        </form>
      </div>
     }
    
    </div>
      )
    }
  </div>
  );
}
export default Recipes;
