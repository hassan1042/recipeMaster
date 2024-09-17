import React from 'react';

const IndRecipeVideo = ({ indRecipe }) => {
  return (
    <div className='mx-auto w-full flex justify-around items-center flex-wrap' >
<div>
<p className='italic text-green-900 dark:text-green-200  font-bold p-1'>
    Watch the video to learn

    </p>
      <iframe 
        className="h-[30vh] mx-auto rounded-lg"
        src={indRecipe.videoUrl} 
        frameBorder="0" 
        allowFullScreen
        title="Recipe Video"
      ></iframe>
</div>
      <a
      className='text-blue-400 p-2 underline text-lg '
       href={indRecipe.videoLink}>Watch a Tutorial?</a>
    </div>
  );
}

export default IndRecipeVideo;
