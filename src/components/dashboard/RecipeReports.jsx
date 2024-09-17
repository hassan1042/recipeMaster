import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecipeReports = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  // Example categories and subcategories
  const categories = ["All", "Indian", "Italian", "Chinese", "Pakistani", "Others"];
    const subCategories = ["All", "Vegan", "Desserts", "Main Course", "Snacks", "General"];

  // Fetch recipes based on date range
  const fetchRecipes = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const recipesRef = collection(db, "recipes");

      // Convert JavaScript Date objects to Firestore Timestamps
      const startTimestamp = Timestamp.fromDate(new Date(startDate));
      const endTimestamp = Timestamp.fromDate(new Date(endDate.setHours(23, 59, 59, 999))); // Include the full day

      // Query to fetch recipes within the selected date range
      let q = query(
        recipesRef,
        where("addedDate", ">=", startTimestamp),
        where("addedDate", "<=", endTimestamp)
      );

      const querySnapshot = await getDocs(q);

      // Map through the query snapshot and get the recipes
      const fetchedRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes); // Initially set to the full results

      console.log("Fetched recipes:", fetchedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Filter recipes based on selected category
  const filterByCategory = (category) => {
    setActiveCategory(category);
    const filtered = category === "All" ? recipes : recipes.filter((recipe) => recipe.category === category);
    filterBySubCategory(activeSubCategory, filtered); // Apply subcategory filter after category
  };

  // Filter recipes based on selected subcategory
  const filterBySubCategory = (subCategory, baseRecipes = recipes) => {
    setActiveSubCategory(subCategory);
    const filtered =
      subCategory === "All" ? baseRecipes : baseRecipes.filter((recipe) => recipe.subCategory === subCategory);
    setFilteredRecipes(filtered);
  };

  // Generate the report as PDF using jsPDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Recipe Report", 20, 10);
    doc.autoTable({
      head: [["Name", "Category", "SubCategory", "Health %", "Rating"]],
      body: filteredRecipes.map((recipe) => [
        recipe.name,
        recipe.category,
        recipe.subCategory || "N/A",
        recipe.healthPercentage || "N/A",
        recipe.rating || "N/A",
      ]),
    });
    doc.save("recipe_report.pdf");
  };
    // Print report function
    const printReport = () => {
      window.print();
    };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Recipe Reports</h2>

      {/* Date Range Picker */}
      <div className="flex space-x-2 mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="py-2 px-4 rounded-lg border"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="py-2 px-4 rounded-lg border"
        />
        <button
          onClick={fetchRecipes}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Generate Report
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-lg ${activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Subcategory Filters */}
      <div className="flex space-x-2 mb-4">
        {subCategories.map((subCategory) => (
          <button
            key={subCategory}
            className={`py-2 px-4 rounded-lg ${activeSubCategory === subCategory ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => filterBySubCategory(subCategory)}
          >
            {subCategory}
          </button>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="font-bold">{recipe.name}</h3>
            <p>Category: {recipe.category}</p>
            <p>SubCategory: {recipe.subCategory}</p>
            <p>Health Meter: {recipe.healthPercentage}%</p>
            <p>Rating: {recipe.rating}/5</p>
          </div>
        ))}
      </div>

      {/* Download Report Button */}
      <button
        onClick={generatePDF}
        className="py-2 px-4 mt-4 bg-green-500 text-white rounded-lg me-3"
      >
        Download Report
      </button>
      <button
          onClick={printReport}
          className="py-2 px-4 bg-yellow-500 text-white rounded-lg"
        >
          Print Report
        </button>
    </div>
  );
};

export default RecipeReports;
