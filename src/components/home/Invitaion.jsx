import React from 'react'
import { Link } from 'react-router-dom'

function Invitaion() {
  return (

        <div className="flex justify-center items-center p-10 dark:text-gray-200">
          <div className="w-[90%] md:w-[50%]">
            If you have a knack for cooking and want to share your culinary
            masterpieces with the world, you've come to the right place! With
            our platform, you can showcase your secret recipes and let others
            in on the magic of your cooking prowess. Whether it's a
            mouth-watering main course, a delectable dessert, or a tantalizing
            appetizer, your culinary creations deserve to be shared and
            celebrated. Not only can you share your recipes, but you can also
            invite others to rate and review them, adding a dynamic layer of
            interaction and feedback to your culinary adventures. So why wait?
            Share your recipes today and join a community of passionate food
            enthusiasts eager to savor every flavor and share their own
            culinary delights!
            <div className="mt-5">
              <Link
                to="./Recipes"
                className="py-2   px-4 rounded-lg text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 shadow-lg"
              >
                Add your Recipe now
              </Link>
            </div>
          </div>
          <div className="w-[50%] hidden md:block">
            <img
              src="./Images/chef.jpeg"
              alt="chef"
              className="w-full  xl:p-2 ps-5 shadow-lg"
            />
          </div>
        </div>
   
  )
}

export default Invitaion
