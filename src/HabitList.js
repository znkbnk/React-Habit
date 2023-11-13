import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkillBar from "./SkillBar";

const HabitList = ({
  habits,
  setHabits,
  selectedCategory,
  setCompletedHabits,
  completedHabits,
}) => {
  const [unfinishedHabits, setUnfinishedHabits] = useState([]);
  const [showUnfinished, setShowUnfinished] = useState(false);

  const calculatePercentage = (habit) => {
    if (habit.goalDays === 0) return 100;
    const completedDays = habit.checkedDates?.length || 0;
    return (completedDays / habit.initialGoalDays) * 100;
  };

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    // Convert date strings back to Date objects
    const parsedHabits = savedHabits.map((habit) => ({
      ...habit,
      date: new Date(habit.date),
      selectedDate: habit.selectedDate ? new Date(habit.selectedDate) : null,
      selectedDateRange: habit.selectedDateRange
        ? {
            start: new Date(habit.selectedDateRange.start),
            end: new Date(habit.selectedDateRange.end),
          }
        : null,
    }));
    setHabits(parsedHabits);

    const savedUnfinishedHabits =
      JSON.parse(localStorage.getItem("unfinishedHabits")) || [];
    setUnfinishedHabits(savedUnfinishedHabits);
  }, [setHabits]);

  useEffect(() => {
    if (unfinishedHabits.length > 0) {
      setShowUnfinished(true);
    }
  }, [unfinishedHabits]);

  const handleCheckClick = (habit) => {
    const currentDate = new Date();
    const updatedGoalDays = habit.goalDays - 1;
    const updatedHabit = { ...habit, goalDays: updatedGoalDays };

    const checkedDate = { date: currentDate, goalDays: updatedGoalDays };
    updatedHabit.checkedDates = [
      ...(updatedHabit.checkedDates || []),
      checkedDate,
    ];

    const updatedHabits = [...habits];
    const habitIndex = updatedHabits.findIndex((h) => h.key === habit.key);
    updatedHabits[habitIndex] = updatedHabit;
    setHabits(updatedHabits);

    localStorage.setItem("habits", JSON.stringify(updatedHabits));

    if (updatedGoalDays === 0) {
      setCompletedHabits((prevCompletedHabits) => [
        ...prevCompletedHabits,
        updatedHabit,
      ]);

      saveCompletedHabitsToStorage([...completedHabits, updatedHabit]);
      if (updatedGoalDays > 0) {
        const unfinished = updatedHabits.filter((h) => h.goalDays > 0);
        localStorage.setItem("unfinishedHabits", JSON.stringify(unfinished));
      }

      if (updatedGoalDays === 0) {
        toast.success(
          `You've completed the habit "${
            updatedHabit.name
          }" on ${currentDate.toLocaleString()}`
        );
      } else {
        const daysLeftMessage =
          updatedGoalDays === 1 ? "1 day left" : `${updatedGoalDays} days left`;
        toast.success(
          `You've checked off a day for the habit "${
            updatedHabit.name
          }" (${daysLeftMessage}) on ${currentDate.toLocaleString()}.`
        );
      }
    }
  };

  const saveCompletedHabitsToStorage = (completedHabits) => {
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
  };

  const filteredHabits =
    selectedCategory === "All"
      ? habits
      : habits.filter(
          (habit) =>
            habit.category && habit.category.trim() === selectedCategory.trim()
        );

  const handleToggleUnfinished = () => {
    setShowUnfinished(!showUnfinished);
  };

  const handleDeleteHabit = (habit) => {
    if (habit.goalDays === 0) {
      const updatedHabits = habits.filter((h) => h.key !== habit.key);

      setHabits(updatedHabits);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));

      setCompletedHabits((prevCompletedHabits) => [
        ...prevCompletedHabits,
        { ...habit, goalDays: habit.initialGoalDays },
      ]);

      saveCompletedHabitsToStorage(completedHabits);

      toast.error(
        `Finished habit "${habit.name}" has been moved to Completed Habits.`
      );
    } else {
      toast.error(`Unfinished habit "${habit.name}" cannot be deleted.`);
    }
  };

  return (
    <div>
      <button onClick={handleToggleUnfinished}>
        {showUnfinished ? "Show Finished Habits" : "Show Unfinished Habits"}
      </button>
      <ul className='habitlist-buttons'>
        {filteredHabits
          .filter((habit) => {
            if (showUnfinished) {
              return habit.goalDays > 0;
            } else {
              return habit.goalDays === 0;
            }
          })
          .map((habit, index) => (
            <li key={index}>
              {habit?.category ? (
                <div id='completed-habits-modal'>
                  <div className='completed-habits-content'>
                    <h2>Category: {habit.category}</h2>
                    <div>
                      <span>Habit Name: {habit.name}</span>
                      <br />
                      <span>
                        Created Date:{" "}
                        {habit.date instanceof Date && !isNaN(habit.date)
                          ? habit.date.toDateString()
                          : "Not specified"}{" "}
                      </span>
                      <br />
                      <span>
                        {habit.selectedDateRange
                          ? `Date Range: ${
                              habit.selectedDateRange.start instanceof Date
                                ? habit.selectedDateRange.start.toDateString()
                                : "Not specified"
                            } - ${
                              habit.selectedDateRange.end instanceof Date
                                ? habit.selectedDateRange.end.toDateString()
                                : "Not specified"
                            }`
                          : habit.selectedDate instanceof Date
                          ? `Selected Date: ${habit.selectedDate.toDateString()}`
                          : "Selected Date: Not specified"}
                      </span>
                      {habit.goalDays > 0 ? (
                        <p>
                          Goal: {habit.goalDays}{" "}
                          {habit.goalDays === 1 ? "day" : "days"} left
                          <br />
                          <br />
                          <br />
                          <SkillBar percentage={calculatePercentage(habit)} />
                          {habit?.notes && <p>Notes: {habit.notes}</p>}
                        </p>
                      ) : (
                        <></>
                      )}
                      {habit.goalDays === 0 ? (
                        <p>
                          Goal achieved in: {habit.initialGoalDays}{" "}
                          {habit.initialGoalDays === 1 ? "day" : "days"}
                          <button
                            onClick={() => handleDeleteHabit(habit)}
                            disabled={habit.goalDays > 0}
                          >
                            DELETE
                          </button>
                        </p>
                      ) : (
                        <div className='habitlist-button'>
                          <button
                            onClick={() => handleCheckClick(habit)}
                            disabled={habit.goalDays <= 0}
                          >
                            CHECK
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HabitList;
