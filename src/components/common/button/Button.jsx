import React from 'react'

function Button({text}) {
  return (
    <button
    className="py-2   px-2 md:px-4 rounded-lg text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 shadow-lg"
  >
   {text}
  </button>
  )
}

export default Button
