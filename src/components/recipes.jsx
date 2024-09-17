import React, { useState, useEffect } from "react";
import { addRecipe } from "../firebase/Firebase";
import DialogueBoxMessage from "./common/dialogueBox/DialogueBoxMessage";
import ScrollToTopOnMount from "./common/scrollToTop/ScrollToTopOnMount";
import LoginPage from "./Login";
import { useAuth } from "../hookx/use-Auth";
import { serverTimestamp } from "firebase/firestore";

function Recipes({uid, userName, userImg}) {

 
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
  // const uid = currentUser ? currentUser.uid : null;

  // const userName = currentUser.userName;
  // const userImg = currentUser.photoURL;

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
  
  // Example usage
  const handleIngredientsChange = (e) => {
    const input = e.target.value;
    const ingredientList = input.split(',').map(normalizeIngredient);
    setIngredients(ingredientList);
  };



  

  return (
  <>
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
     
  
<div className=" bg-neutral-200 px-8 py-0">
       
        <form className="pb-2" onSubmit={handleSubmit}>
          <label htmlFor="name" className="flex items-center ">
            <i className="md:text-xl  font-bold">Name:</i>
            <input
              className="w-auto capitalize p-2 m-4  text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name of the recipe"
              required
            />
          </label>
          <div className="flex items-center justify-center flex-wrap">
          <label className="flex items-center" htmlFor="introduction">
              <i className="md:text-xl  font-bold">Introduction:</i>
              <textarea
                className="w-auto capitalize  p-2 m-4 text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                type="text"
                placeholder="Introduce your recipe"
                rows="2"
                cols="30"
                required
              />
            </label>
            <label className="flex items-center " htmlFor="ingredients">
  <i className="md:text-xl  font-bold"> Ingredients:</i>
  <textarea
    className="w-auto capitalize p-2 m-4  text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
    value={ingredients}
    onChange={(e) => setIngredients(e.target.value.split(',').map(normalizeIngredient))}
    type="text"
    placeholder="Ingredients of your Recipe (separated by commas)"
    rows="2"
    cols="30"
    required
  />
</label>

            <label className="flex items-center" htmlFor="making">
              <i className="md:text-xl  font-bold">Making:</i>
              <textarea
                className="w-auto capitalize  p-2 m-4 text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={making}
                onChange={(e) => setMaking(e.target.value)}
                type="text"
                placeholder="Explain your recipe"
                rows="2"
                cols="30"
                required
              />
            </label>
           
          </div>
          {/* Categories */}
          <div className="md:w-[50%]  inline-block">
            <label htmlFor="category">
              <i className="font-bold">Select a Category :</i>
              <div>
                <input
                  type="radio"
                  name="category"
                  value="chineese"
                  onChange={(e) => setCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Chineese
                <input
                  type="radio"
                  name="category"
                  value="pakistani"
                  onChange={(e) => setCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Pakistani
                <input
                  type="radio"
                  name="category"
                  value="Italian"
                  onChange={(e) => setCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Italian
                <input
                  type="radio"
                  name="category"
                  value="Indian"
                  onChange={(e) => setCategory(e.target.value)}
                  className="m-2 sm:m-5 visited:bg-pink-500"
                  required
                />
                Indian
                <input
                  type="radio"
                  name="category"
                  value="Others"
                  onChange={(e) => setCategory(e.target.value)}
                  className="m-2 sm:m-5 visited:bg-pink-500"
                  required
                />
                Others
              </div>
            </label>
          </div>

          {/* SUb Categories */}
          <div className="md:w-[50%]  inline-block">
            <label htmlFor="subCategory">
              <i className="font-bold">Select a SubCategory :</i>
              <div>
                <input
                  type="radio"
                  name="subCategory"
                  value="Rice"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Rice
                {/* <input
                  type="radio"
                  name="subCategory"
                  value="Bread"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Bread */}
                <input
                  type="radio"
                  name="subCategory"
                  value="Curry"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Curry
                <input
                  type="radio"
                  name="subCategory"
                  value="Vegan"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Vegan
                <input
                  type="radio"
                  name="subCategory"
                  value="Snacks"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Snacks
                <input
                  type="radio"
                  name="subCategory"
                  value="Desserts"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                Desserts
                <input
                  type="radio"
                  name="subCategory"
                  value="General"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                General
              </div>
            </label>
          </div>
          {/* The Images */}
          <div className=" mx-auto  w-full text-start p-5">
            <label htmlFor="imageInput">
              <i className=" font-bold italic me-5 ">Upload  images of your dish here (at least 2 recommended ):</i>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                className="font-bold italic py-3 "
                required
              />
            </label>
          </div>
          {/* video and video link */}
          <div className="mx-auto w-full text-start p-5">
  <label htmlFor="videoInput">
    <i className="font-bold italic me-5">Upload your video of making here:</i>
    <input
      type="file"
      accept="video/*"
      onChange={handleVideoChange}
      className="font-bold italic py-3"
      required
    />
  </label>
  <label htmlFor="link" className="flex items-center ">
            <i className="md:text-lg  font-semibold">Link for a Tutorial(optional):</i>
            <input
              className="w-auto  p-2 m-4  text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              type="url"
              placeholder="Paste your link here"
              
            />
          </label>

</div>

          {/* the health percentage */}
          <div className="md:text-[1.1em] md:font-semibold font-serif ">
            <p className="py-3">
              {" "}
              Please Select the correct quantity of the specified elements in
              your recipe:{" "}
            </p>
            <label className="m-3 grow flex">
              Fats: &nbsp; &nbsp;
              <input
                type="range"
                value={fats}
                onChange={(e) => setFats(parseFloat(e.target.value))}
                required
              />{" "}
              &nbsp; &nbsp; {fats}
            </label>
            <label htmlFor="protiens" className="m-3 grow flex">
              Proteins: &nbsp; &nbsp;
              <input
                name="protiens"
                type="range"
                value={proteins}
                onChange={(e) => setProteins(parseFloat(e.target.value))}
                required
              />{" "}
              &nbsp; &nbsp; {proteins}
            </label>
            <label className="m-3 grow flex ">
              Carbohydrates: &nbsp; &nbsp;
              <input
                type="range"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(parseFloat(e.target.value))}
                required
              />{" "}
              &nbsp; &nbsp; {carbohydrates}
            </label>
          </div>
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
  </>
  );
}
export default Recipes;
