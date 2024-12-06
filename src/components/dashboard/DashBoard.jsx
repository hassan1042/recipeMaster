import React, { useState } from 'react';
import { FaHome, FaBook, FaHeart } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
import { TbReportSearch } from "react-icons/tb";
import { RiFolderHistoryFill } from "react-icons/ri";
import { useAuth } from '../../hookx/use-Auth';
import LoginPage from '../Login';
import RecipeInfo from './RecipesInfo';
import RecipeReports from './RecipeReports';
import AddedRecipes from './Favorites';
import Favourites from '../user/Favourites';




function Dashboard() {

    const {currentUser} = useAuth();
  const [activeTab, setActiveTab] = useState('hostels');
  const [isExpanded, setIsExpanded] = useState(true);
  if (!currentUser) {
    return <LoginPage />;
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'addedRecipes':
        return <AddedRecipes />;
      case 'RecipeInfo':
        return <RecipeInfo />;
      case 'RecipeReports':
         return <RecipeReports />;
         case 'favorites':
          return <Favourites uid={currentUser.uid} />;
        // case 'hostels-history':
    //       return <HostelHistory/>;
        //   case 'reports':
        //     return <Tabs/>;
      default:
        return <AddedRecipes />;
    }
  };

  return (
    <div className="flex bg-text dark:bg-slate-950 pt-32 ">
      {/* Sidebar */}
      <div className={`bg-main text-textDark dark:text-text font-medium italic dark:bg-slate-900  sticky   top-10   ${isExpanded ? 'lg:w-[15%]' : 'lg:w-16'} max-lg:w-16 transition-width duration-300 h-auto`}>
      
        <button
          className="text-pink-500 p-4 focus:outline-none max-lg:hidden mt-5"
          onClick={toggleSidebar}
        >
          {isExpanded ? <FaAnglesLeft /> : <FaAnglesRight />}
        </button>
        <div className="mt-8 space-y-4 w-full">
          <button
            className={`flex items-center p-4  w-full ${activeTab === 'addedRecipes' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('addedRecipes')}
          >
            <FaHome className="text-lg" />
            {isExpanded && <span className="ml-2 max-lg:hidden">Your Recipes</span>}
          </button>
          <button
            className={`flex items-center p-4  w-full ${activeTab === 'favorites' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <FaHeart className="text-lg" />
            {isExpanded && <span className="ml-2 max-lg:hidden">Your Favourites</span>}
          </button>
          <button
            className={`flex items-center p-4  w-full ${activeTab === 'RecipeInfo' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('RecipeInfo')}
          >
            <FaBook className="text-lg" />
            {isExpanded && <span className="ml-2 max-lg:hidden">Recipe Info </span>}
          </button>
          <button
            className={`flex items-center p-4  w-full ${activeTab === 'RecipeReports' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('RecipeReports')}
          >
            <FaBook className="text-lg" />
            {isExpanded && <span className="ml-2 max-lg:hidden">Recipe Reports </span>}
          </button>
      
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-2 lg:p-8 w-[85%]">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
