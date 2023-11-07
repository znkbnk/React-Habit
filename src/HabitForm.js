import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

const HabitForm = ({
  addHabit,
  setSelectedCategory,
  categories,
  setSelectedDate,
  selectedDate,
  setSelectedFrequency,
  selectedFrequency,
}) => {
  const [habit, setHabit] = useState({
    name: "",
    reminderTime: "",
    goalDays: "",
    initialGoalDays: "",
    category: "",
    notes: "",
  });
  const [goalDaysError, setGoalDaysError] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    const defaultCategories = [];
    const filteredCategories = categories.filter(
      (category) => !defaultCategories.includes(category)
    );
    setUniqueCategories([...defaultCategories, ...filteredCategories]);
  }, [categories]);

  const handleHabitChange = (event) => {
    setHabit((prevHabit) => ({ ...prevHabit, name: event.target.value }));
  };

  const handleReminderChange = (event) => {
    setHabit((prevHabit) => ({
      ...prevHabit,
      reminderTime: event.target.value,
    }));
  };

  const handleGoalDaysChange = (event) => {
    const goalDays = parseInt(event.target.value);
    if (!isNaN(goalDays) && goalDays >= 1) {
      setHabit((prevHabit) => ({
        ...prevHabit,
        goalDays,
        initialGoalDays: goalDays,
      }));
      setGoalDaysError(""); 
    } else {
      setGoalDaysError("Number must be higher than 0");
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setHabit((prevHabit) => ({
      ...prevHabit,
      category: selectedCategory,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (habit.name.trim() !== "" && habit.category !== "") {
      const currentDate = new Date();
      const habitWithCategory = {
        ...habit,
        name: `${habit.name}`,
        category: habit.category,
        date: currentDate,
      };

       if (selectedFrequency !== "none") {
         habitWithCategory.selectedDate = selectedDate;
       }
      addHabit(habitWithCategory);

      setSelectedCategory(habit.category);

      setHabit({
        name: "",
        reminderTime: "",
        goalDays: "",
        initialGoalDays: "",
        category: "",
        notes: "",
      });
    }
  };

  const handleNotesChange = (event) => {
    setHabit((prevHabit) => ({
      ...prevHabit,
      notes: event.target.value,
    }));
  };

  const handleDateChange = (date) => {
  setSelectedDate(date);
};

  return (
    <div className='habit-form'>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='email'>Habit Name:</label>
        <div>
          <input
            type='text'
            value={habit.name}
            onChange={handleHabitChange}
            placeholder='Enter a new habit'
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Reminder time:</label>
          <input
            type='text'
            value={habit.reminderTime}
            onChange={handleReminderChange}
            placeholder='(e.g., 12:00)'
          />
        </div>
        <div>
          <label htmlFor='email'>Enter goal days:</label>

          <input
            type='number'
            value={habit.goalDays}
            onChange={handleGoalDaysChange}
            placeholder='Enter goal days'
            required
          />
        </div>
        {goalDaysError && <p style={{ color: "red" }}>{goalDaysError}</p>}
        <div className='input-container'>
          <div>
            <select
              value={habit.category}
              onChange={handleCategoryChange}
              required
            >
              <option value='' disabled>
                Please choose category
              </option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <select
            onChange={(e) => setSelectedFrequency(e.target.value)}
            value={selectedFrequency}
          >
            <option value='none'>Select Frequency</option>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
          </select>

          <div className='textarea-container'>
            <textarea
              value={habit.notes}
              onChange={handleNotesChange}
              placeholder='Enter notes (optional)'
            />
          </div>
          {selectedFrequency !== "none" && (
            <div className='custom-calendar'>
              <label htmlFor='selectedDate'>Select Date:</label>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                required
              />
            </div>
          )}
        </div>
        <button type='submit'>Add Habit</button>
      </form>
    </div>
  );
};

export default HabitForm
