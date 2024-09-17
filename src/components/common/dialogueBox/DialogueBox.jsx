import React from 'react'
import { Link } from 'react-router-dom'

const DialogueBox = ({isRecipeVisible , setIsRecipeVisible, dialogueText, linkTo }) => {

    const handleDialogBoxClosing = () => {
        setIsRecipeVisible(!isRecipeVisible);
      };
  return (
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                {/* Color Overlay */}
                  <div className="fixed inset-0 bg-black opacity-50"></div>
                  {/* Dialogue Box */}
                  <div className="relative z-50 max-w-md px-6 py-4 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Success
                      </h2>
                      <Link
                        to={linkTo}
                        onClick={handleDialogBoxClosing}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Link>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                     {dialogueText}
                    </p>
                  </div>
                </div>
    </div>
  )
}

export default DialogueBox
