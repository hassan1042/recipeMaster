import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecipeFilterContext } from "../../contexts/recipeFilterContext";

const RecipeReports = () => {
  const [allRecipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  const { recipes } = useRecipeFilterContext();

  const uniqueCategories = [
    "All",
    ...new Set(recipes.map((curElm) => curElm.category)),
  ];

  const fetchRecipes = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const recipesRef = collection(db, "recipes");
      const startTimestamp = Timestamp.fromDate(new Date(startDate));
      const endTimestamp = Timestamp.fromDate(new Date(endDate.setHours(23, 59, 59, 999)));

      let q = query(
        recipesRef,
        where("addedDate", ">=", startTimestamp),
        where("addedDate", "<=", endTimestamp)
      );

      const querySnapshot = await getDocs(q);

      const fetchedRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes);

    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    const filtered = category === "All" ? allRecipes : allRecipes.filter((recipe) => recipe.category === category);
    filterBySubCategory(activeSubCategory, filtered);
  };

  const filterBySubCategory = (subCategory, baseRecipes = allRecipes) => {
    setActiveSubCategory(subCategory);
    const filtered = subCategory === "All" ? baseRecipes : baseRecipes.filter((recipe) => recipe.subCategory === subCategory);
    setFilteredRecipes(filtered);
  };

  // Generate PDF with logo and report
  const generatePDF = () => {
    const doc = new jsPDF();
   

     // Set background color (using RGB or HEX)
  doc.setFillColor(240, 240, 240); // Light gray background
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // 'F' stands for fill




    // Add logo (replace with actual base64 string or image URL)
    const logo = './Images/recipeMaster.png'; // Shortened
    doc.addImage(logo, 'JPEG', 10, 10, 30, 30); // Adjust dimensions accordingly

    // Add report title and table
    doc.setFontSize(16);
    doc.text("Recipe Report by RecipeMaster", 20, 50); // Positioning below the logo


    doc.autoTable({
      startY: 60,
      head: [["Name", "Category", "SubCategory", "Health %", "Chef"]],
      body: filteredRecipes.map((recipe) => [
        recipe.name,
        recipe.category,
        recipe.subCategory || "N/A",
        recipe.healthPercentage || "N/A",
        recipe.userName || "Anonymous",
      ]),
    });
         // Get the final Y position of the table to place the text after the table
  const finalY = doc.lastAutoTable.finalY || 70;

  doc.setTextColor(100); // Optional: Set the text color (gray in this case)
  doc.setFont("helvetica", "bold"); // Set font style to bold
  doc.text("Created and Managed By: Ikram & Zahid", 20, finalY + 30); 

    doc.save("recipe_report.pdf");
  };

  // Print table function
  const printReport = () => {
    const doc = new jsPDF();
  
    // Add logo (replace with actual base64 string or image URL)
    const logo = './Images/recipeMaster.png'; // Shortened for example
    doc.addImage(logo, 'JPEG', 10, 10, 30, 30); // Adjust dimensions accordingly
    // Add report title and table
    doc.setFontSize(16);
    doc.text("Recipe Report by RecipeMaster", 20, 50); // Positioning below the logo

  
    doc.autoTable({
      startY: 60,
      head: [["Name", "Category", "SubCategory", "Health %", "Chef"]],
      body: filteredRecipes.map((recipe) => [
        recipe.name,
        recipe.category,
        recipe.subCategory || "N/A",
        recipe.healthPercentage || "N/A",
        recipe.userName || "Anonymous",
      ]),
    });
      // Get the final Y position of the table to place the text after the table
  const finalY = doc.lastAutoTable.finalY || 70;

    doc.setTextColor(100); // Optional: Set the text color (gray in this case)
    doc.setFont("helvetica", "bold"); // Set font style to bold
    doc.text("Created and Managed By: Ikram & Zahid", 20, finalY + 30); 
  
    // Open the PDF in a new window for printing
    const pdfDataUrl = doc.output('dataurlstring');
    
    const printWindow = window.open();
    if (printWindow) {
      printWindow.document.write(
        `<iframe width='100%' height='100%' src='${pdfDataUrl}'></iframe>`
      );
      printWindow.document.close();
    }
  };
  

  return (
    <div 
         data-aos="zoom-out-up"
     data-aos-duration="3000"
    >
      <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Recipe Reports</h2>

      <div className="flex space-x-2 mb-4 flex-wrap space-y-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="py-2 px-4 rounded-lg border mt-4"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="py-2 px-4 rounded-lg border "
        />
        <button
          onClick={fetchRecipes}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Generate Report
        </button>
      </div>

      <div className="flex space-x-2 mb-4 flex-wrap space-y-4">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-lg ${activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div id="report-table">
        <div className="flex justify-around flex-wrap items-center space-y-4 ">

          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="p-4 bg-white shadow-md rounded-lg w-[80%] md:w-[47%] lg:w-[30%] ">
              <h3 className="font-bold capitalize italic">{recipe.name}</h3>
              <p>Category: {recipe.category}</p>
              <p>SubCategory: {recipe.subCategory}</p>
              <p>Health Meter: {recipe.healthPercentage}%</p>
              <p>Rating: {recipe.rating}/5</p>
            </div>
          ))}
        </div>
      </div>

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
