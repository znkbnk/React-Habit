import React, { useState, useEffect } from "react";

const CompletedHabits = ({ completedHabits, onClose, setShowChart,setShowHabitForm }) => {
  const [habits, setHabits] = useState(completedHabits);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("completedHabits"));
    if (storedHabits) {
      setHabits(storedHabits);
    }
  }, []);

  useEffect(() => {
    setHabits(completedHabits);
  }, [completedHabits]);

  useEffect(() => {
    localStorage.setItem("completedHabits", JSON.stringify(habits));
  }, [habits]);

  const handleDelete = (index) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
  };

  // Reverse the order of habits to show the most recent completed habits at the top
  const reversedHabits = [...habits].reverse();

  return (
    <div className='completed-habits-modal'>
      <div className='completed-habits-content'>
        <h2>History</h2>
        <button
          onClick={() => {
            onClose();
            setShowChart(false);
            setShowHabitForm(true);

          }}
        >
          Close
        </button>

        <ul>
          {reversedHabits.map((habit, index) => (
            <li key={index} className='habit-item'>
              <div className='completed-result-column'>
                <span>
                  {" "}
                  <strong>Habit name:</strong> {habit.name}
                </span>

                {habit.name !== undefined ? (
                  <span>
                    <strong>Achieved in:</strong> {habit.initialGoalDays} days{" "}
                  </span>
                ) : (
                  "No goal set"
                )}
                {habit.category && (
                  <span className='category-name'>
                    <strong> Category:</strong> {habit.category}{" "}
                  </span>
                )}
              </div>
              <div className='completed-result-column'>
                <strong>Check-ins:</strong>
                <ul>
                  {habit.checkedDates &&
                    habit.checkedDates.map((check, checkIndex) => (
                      <li key={checkIndex}>{check.date.toLocaleString()}</li>
                    ))}
                </ul>
              </div>
              <button
                className='completed-delete-button'
                onClick={() => handleDelete(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            onClose();
            setShowChart(false);
            setShowHabitForm(true)
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CompletedHabits;
