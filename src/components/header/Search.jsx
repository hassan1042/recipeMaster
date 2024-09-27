import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Button from '../../components/common/button/Button';


function Search() {
  const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("name");

    const handleSearch = () => {
        if (searchTerm.trim()) {
          navigate(`/search?type=${searchType}&query=${searchTerm}`);
        }
      };
  return (
    <div className="flex items-center flex-wrap space-y-2 justify-center">
    <select
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
      className="p-2 rounded-lg border border-icons mr-2  text-gray-600 dark:bg-slate-600 dark:text-text  max-md:w-[100px] mt-2"
    >
      <option value="name">By Name</option>
      <option value="ingredients">By Ingredients</option>
    </select>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search recipes"
      className="p-2 rounded-lg border border-icons mr-2  text-gray-600 dark:bg-slate-600 dark:text-text max-md:w-[150px]"
    />

    <div
    onClick={handleSearch}
    >
      <Button text={'Search'} />
    </div>
  </div>
  )
}

export default Search
