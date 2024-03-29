import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkillBar from "./SkillBar";
import emailjs from "emailjs-com";

const HabitList = ({
  habits,
  setHabits,
  showUnfinished,
  setCompletedHabits,
  completedHabits,
  setShowUnfinished,
  setShowHabitForm,
  
}) => {
  const [unfinishedHabits, setUnfinishedHabits] = useState([]);

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

    // Sort the habits array by creation date in descending order
    const sortedHabits = parsedHabits.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    setHabits(sortedHabits);

    const savedUnfinishedHabits =
      JSON.parse(localStorage.getItem("unfinishedHabits")) || [];
    setUnfinishedHabits(savedUnfinishedHabits);
  }, [setHabits]);

  useEffect(() => {
    if (unfinishedHabits.length > 0) {
      setShowUnfinished(false);
    }
  }, [setShowUnfinished, unfinishedHabits]);

  const sendHabitCompletionEmail = (habit) => {
    const templateParams = {
      to_email: "your_email@example.com", // Replace with your email
      subject: "Habit Completed",
      message: `Congratulations! You have completed the habit: ${habit.name}`,
    };

    emailjs
      .send(
        "YOUR_EMAILJS_SERVICE_ID",
        "YOUR_EMAILJS_TEMPLATE_ID",
        templateParams,
        "YOUR_EMAILJS_USER_ID"
      )
      .then((response) => {
        console.log("Email sent:", response);
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };

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

        // Send email when habit is completed
        sendHabitCompletionEmail(updatedHabit);
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

  const filteredHabits = habits.filter((habit) => habit.goalDays > 0);

  const handleCloseClick = () => {
    setShowUnfinished(false);
    setShowHabitForm(true);
  };

  if (!showUnfinished) {
    return null; // Return null when showUnfinished is false
  }

  return (
    <div className='habit-form'>
      <ul className='habitlist-buttons habit-list-form'>
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
                        {habit.selectedDateRange ? (
                          <>
                            <div>
                              Date Range Start:{" "}
                              {habit.selectedDateRange.start instanceof Date
                                ? habit.selectedDateRange.start.toDateString()
                                : "Not specified"}
                            </div>
                            <div>
                              Date Range End:{" "}
                              {habit.selectedDateRange.end instanceof Date
                                ? habit.selectedDateRange.end.toDateString()
                                : "Not specified"}
                            </div>
                          </>
                        ) : habit.selectedDate instanceof Date ? (
                          <div>
                            Selected Date: {habit.selectedDate.toDateString()}
                          </div>
                        ) : (
                          <div>Selected Date: Not specified</div>
                        )}
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

                      <div className='checkdelete-container'>
                        <button
                          onClick={() => handleCheckClick(habit)}
                          disabled={habit.goalDays <= 0}
                        >
                          CHECK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        <button className='special-button' onClick={handleCloseClick}>
          Close
        </button>
      </ul>
    </div>
  );
};

export default HabitList;
