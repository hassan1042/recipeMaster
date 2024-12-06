import React from "react";

function ImgVidLink({handleImageChange, handleVideoChange,videoLink, setVideoLink, }) {
  return (
    <div>
      <div className=" mx-auto  w-full text-start p-5">
        <label htmlFor="imageInput">
          <i className=" font-bold italic me-5 ">
            Upload images of your dish here (at least 2 recommended ):
          </i>
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
      <div className="mx-auto w-full text-start p-5">
        <label htmlFor="videoInput">
          <i className="font-bold italic me-5">
            Upload your video of making here:
          </i>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="font-bold italic py-3"
          />
        </label>
        <label htmlFor="link" className="flex items-center justify-center ">
          <i className="md:text-lg  font-semibold">
            Link for a Tutorial(optional):
          </i>
          <input
            className="w-auto dark:text-black p-2 m-4  text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 max-sm:w-[180px]"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            type="url"
            placeholder="Paste your link here"
          />
        </label>
      </div>
    </div>
  );
}

export default ImgVidLink;
