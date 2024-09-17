import React, { useState } from 'react';
import { FaHome, FaBook, FaHeart } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
import { TbReportSearch } from "react-icons/tb";
import { RiFolderHistoryFill } from "react-icons/ri";
import Favourites from './Favorites';
import { useAuth } from '../../hookx/use-Auth';
import LoginPage from '../Login';
import RecipeInfo from './RecipesInfo';
import RecipeReports from './RecipeReports';




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
      case 'favourites':
        return <Favourites />;
      case 'RecipeInfo':
        return <RecipeInfo />;
      case 'RecipeReports':
         return <RecipeReports />;
        // case 'hostels-history':
    //       return <HostelHistory/>;
        //   case 'reports':
        //     return <Tabs/>;
      default:
        return <Favourites />;
    }
  };

  return (
    <div className="flex bg-text dark:bg-slate-950 ">
      {/* Sidebar */}
      <div className={`bg-gray-800 dark:bg-slate-900  ${isExpanded ? 'md:w-[15%]' : 'md:w-16'} max-md:w-16 transition-width duration-300 h-auto`}>
      
        <button
          className="text-white p-4 focus:outline-none max-md:hidden"
          onClick={toggleSidebar}
        >
          {isExpanded ? <FaAnglesLeft /> : <FaAnglesRight />}
        </button>
        <div className="mt-8 space-y-4 w-full">
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'favourites' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('favourites')}
          >
            <FaHome className="text-lg" />
            {isExpanded && <span className="ml-2 max-md:hidden">Your Recipes</span>}
          </button>
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'RecipeInfo' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('RecipeInfo')}
          >
            <FaBook className="text-lg" />
            {isExpanded && <span className="ml-2 max-md:hidden">Recipe Info </span>}
          </button>
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'RecipeReports' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('RecipeReports')}
          >
            <FaBook className="text-lg" />
            {isExpanded && <span className="ml-2 max-md:hidden">Recipe Reports </span>}
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
