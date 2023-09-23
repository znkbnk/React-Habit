import React from "react";

const CategoryDropdown = ({
  showCategoriesDropdown,
  onCategorySelect,
  selectedCategory,
}) => {
  const categories = ["All", "Read", "Drink Water", "Do Exercise"];

  return (
    showCategoriesDropdown && (
      <div className='dropdown-content'>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category)}
            className={`dropdown-link ${
              category === selectedCategory ? "selected" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    )
  );
};

export default CategoryDropdown;
