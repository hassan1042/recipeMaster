import React from 'react';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';

const RecipesDropdown = ({ uniqueCategories, handleCat }) => {
  const options = uniqueCategories.map((category) => ({
    value: category,
    label: category,
  }));

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      handleCat(selectedOption.value);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      margin: '10px',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'yellow' : 'black',
      padding: 10,
    }),
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
    //   styles={customStyles}

      className='bg-black w-32 mx-auto'
      placeholder="Our Recipes"
      components={{
        Option: ({ children, ...props }) => (
          <div {...props.innerProps}
          className='bg-gray-700  px-8 h-full'
          >
            <NavLink
              to="/FilteredRecipes"
              className="capitalize w-full h-auto block"
              onClick={() => handleCat(props.data.value)}
            >
              {children}
            </NavLink>
          </div>
        ),
      }}
    />
  );
};

export default RecipesDropdown;
 