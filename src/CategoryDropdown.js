import React, { useEffect, useRef, useState } from "react";

const CategoryDropdown = ({
  handleShowUnfinishedClick,
  showCategoriesDropdown,
  onCategorySelect,
  onDeleteCategory,
  selectedCategory,
  onCreateCategory,
  categories,
  setShowCategoriesDropdown,
  showHabitForm,
  setShowHabitForm,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [dropdownWidth, setDropdownWidth] = useState(150);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (showCategoriesDropdown) {
          setShowCategoriesDropdown(false);
        }
        if (!showHabitForm) {
          setShowHabitForm(true);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    setShowCategoriesDropdown,
    showCategoriesDropdown,
    setShowHabitForm,
    showHabitForm,
  ]);

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleCreateCategory = () => {
    if (newCategory.trim() !== "") {
      const updatedCategories = [...categories, newCategory];
      onCreateCategory(newCategory);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewCategory("");
    }
  };

  useEffect(() => {
    const maxWidth = categories.reduce((max, category) => {
      const categoryWidth = category.length * 10;
      return Math.max(max, categoryWidth);
    }, 150); // Minimum width of 150px

    setDropdownWidth(maxWidth);
  }, [categories]);

  return (
    showCategoriesDropdown && (
      <div
        ref={dropdownRef}
        className='dropdown-content'
        style={{ width: `${dropdownWidth}px` }}
      >
        <button onClick={handleShowUnfinishedClick}>Unfinished Habits</button>
        <span className='my-categories'>My Categories:</span>
        {categories.map((category, index) => (
          <div key={index} className='category-item-rest'>
            <div className='category-item-content'>
              <span
                onClick={() => onCategorySelect(category)}
                className={`dropdown-link ${
                  category === selectedCategory ? "selected" : ""
                }`}
              >
                {category}
              </span>
              {category && (
                <button
                  className='dropdown-delete-button'
                  onClick={() => onDeleteCategory(category)}
                >
                  x
                </button>
              )}
            </div>
          </div>
        ))}
        {/* to show newly created category in dropdown */}
        {/* {newCategory.trim() !== "" && (
          <div key='newCategory' className='category-item'>
            <button
              onClick={() => onCategorySelect(newCategory)}
              className={`dropdown-link ${
                newCategory === selectedCategory ? "selected" : ""
              }`}
            >
              {newCategory}
            </button>
            <button
              onClick={() => onDeleteCategory(newCategory)}
              className='delete-button'
            >
              x
            </button>
          </div>
        )} */}
        {/* end of comment  */}
        <div>
          <input
            type='text'
            placeholder='Create Category'
            value={newCategory}
            onChange={handleNewCategoryChange}
            className='category-input'
          />
          {newCategory.trim() !== "" && (
            <button onClick={handleCreateCategory} className='category-button'>
              Create
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default CategoryDropdown;

// Alternative approach using concat

// {defaultCategories.concat(categories).map((category, index) => (
//   <button
//     key={index}
//     onClick={() => onCategorySelect(category)}
//     className={`dropdown-link ${
//       category === selectedCategory ? "selected" : ""
//     } ${index === defaultCategories.length + categories.length - 1 ? "last" : ""}`}
//   >
//     {category}
//   </button>
// ))}
