import React, { useEffect } from 'react'
import { useState } from 'react'
import { ListenForComments, addComment } from '../../../services/addCommentsService';

const RecipeComments = ({recipeId, uid, }) => {
  // for retrieving comments
  const [comments, setComments] = useState("");
    const [commentText, setCommentText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(commentText){
        addComment(commentText , recipeId, uid);
        setCommentText("");

        } else { 
            alert("Add something first");
        }
    }
    useEffect(() => {
        const unsubscribe = ListenForComments(setComments, recipeId);
        return () => unsubscribe();
    }, [recipeId, commentText ]); 
  return (
    <div>
    <form 
  className="mt-10 w-full flex items-center justify-center space-x-3"
  onSubmit={handleSubmit}
>
  <input 
    className="flex-grow border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-icons dark:bg-gray-700 dark:text-text"
    type="text" 
    value={commentText}
    placeholder="Add your comment..."
    onChange={(e) => setCommentText(e.target.value)}
  />
  <button
    type="submit"
    className="text-white px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition ease-in-out duration-300 focus:shadow-outline"
  >
    Add 
  </button>
</form>
    {comments && comments.length > 0 ? (
    <div className="w-[80%] mx-auto mt-5">
        {comments.map((curElm, index) => (
            <div key={index} className="mb-4 p-4 bg-slate-100 rounded shadow-sm">
                <p className="text-gray-800">{curElm.comment}</p>
            </div>
        ))}
    </div>
) : (
    <p className="w-[80%] mx-auto mt-5 text-center text-gray-500 dark:text-gray-300">No comments available</p>
)}

    </div>
  )
}

export default RecipeComments
