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
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);

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
   if (habit.name && habit.name.trim() !== "" && habit.category !== "") {
     const currentDate = new Date();
     const habitWithCategory = {
       ...habit,
       name: `${habit.name}`,
       category: habit.category,
       date: currentDate,
     };

     if (selectedFrequency !== "none") {
       if (selectedFrequency === "weekly" && startDate && endDate) {
         habitWithCategory.selectedDateRange = {
           start: startDate,
           end: endDate,
         };
       } else {
         habitWithCategory.selectedDate = selectedDate;
       }
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

     // Reset start and end dates
     setStartDate(null);
     setEndDate(null);
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

   // Check if a frequency is selected and a start date is not set yet
   if (selectedFrequency !== "none" && !startDate) {
     setStartDate(date);

     // Only set the end date for weekly frequency
     if (selectedFrequency === "weekly") {
       const endDate = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);
       setEndDate(endDate);
       setHabit((prevHabit) => ({
         ...prevHabit,
         goalDays: 7,
         initialGoalDays: 7, 
       }));
     }
   }
 };

const tileContent = ({ date, view }) => {
  if (selectedFrequency === "weekly" && startDate && endDate) {
    // Check if the date is within the selected range
    if (date >= startDate && date <= endDate) {
      // Check if the date is the start date
      if (date.getTime() === startDate.getTime()) {
        return (
          <div className='calendar-button start-date-button'>
            <span className='start-date'>Start</span>
          </div>
        );
      }
      // Check if the date is the end date
      else if (date.getTime() === endDate.getTime()) {
        return (
          <div className='calendar-button end-date-button'>
            <span className='end-date'>End</span>
          </div>
        );
      }
    }
  }
  return null;
};

const tileClassName = ({ date }) => {
  if (selectedFrequency === "weekly" && startDate && endDate) {
    if (date.getTime() === startDate.getTime()) {
      return "start-date-tile";
    } else if (date.getTime() === endDate.getTime()) {
      return "end-date-tile";
    }
  }
  return null;
};

  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
    console.log("Selected Frequency:", e.target.value);
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

          <select onChange={handleFrequencyChange} value={selectedFrequency}>
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
                tileContent={tileContent}
                tileClassName={tileClassName}
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

export default HabitForm;
