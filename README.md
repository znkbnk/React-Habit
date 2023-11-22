Bug 1: Show unfinished habits only if You press Unfinished Habits button.

In your HabitList component inside the useEffect block, change the showUnfinished state to false.

Bug 2: Hide the dropdown when the "Unfinished Habits" button is clicked.

In your App.js add setShowCategoriesDropdown(false) line to the handleShowUnfinishedClick function.

Bug 3: Display newly created habits at the top of the list.

In your parent component App, modify your addHabit function. Use [habit, ...prevHabits] instead of [...prevHabits, habit].

Bug 4: In the history section, where old habits are done,  get rid of Finished Habits button.

In App.js file delete handleShowFinishedClick funtion, then delete prop: handleShowFinishedClick={handleShowFinishedClick} from CategoryDropdown and HabitList components.
Delete handleShowFinishedClick prop from  CategoryDropdown.js and HabitList.js.
In your HabitList.js delete Show Finished Habits button from return statement.

Bug 5: There is no need to have button All in CategoryDropdown.js

Delete const defaultCategories = ["All"] statement.
Delete funtionality for defaultcategories from return statement.

Bug 6: Newly created categories by user in CategoryDropdown should not to be a buttons.

Modify the tags in the return statement from <button> to <span> for the part that handles the category names.

New Feature: Create a popup window that reminds you that you have some unfinished habits.

Step 1: Install the react-modal library

Step 2: Create a new simple Modal file named UnfinishedHabitsReminder.js which contains functions to handle opening and closing the modal.

Step 3: In your App.js Define State Variable

Step 4: Use the useEffect Hook:

Retrieve unfinished habits from local storage or set an empty array if none exists.
Check if there are any unfinished habits.
If there are unfinished habits, set the reminder visibility to true.
Integrate the UnfinishedHabitsReminder component into App.js return statement.

Step 5: Style UnfinishedHabitsReminder.js




