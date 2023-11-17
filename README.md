Step 1: Install Email.js

- If you haven't installed emailjs-com,
you can install it using:
npm install emailjs-com

Step 2: Set Up Email.js Account

- Go to Email.js and sign up for an account.
- After signing in, create a new service
and template.

Step 3: Get Email.js IDs

- In your Email.js dashboard, go to the
"Email Services" tab, click on the
service you created.
- Copy the "Service ID" from the top of
the service settings page.
- Go to the "Email Templates" tab, click
on the template you created.
- Copy the "Template ID" from the top
of the template settings page.
- Go to the "Account" tab, from the top
of the page find API keys.
Copy the "Public Key" and use it as User ID.

Step 4: Update HabitList.js

- Import emailjs-com at the beginning of
the file.
- Inside the HabitList component, create the
sendHabitCompletionEmail function, similar to
sendReminderEmail function from App.js.
- Replace "your_email@example.com",
"YOUR_EMAILJS_SERVICE_ID",
"YOUR_EMAILJS_TEMPLATE_ID", and
"YOUR_EMAILJS_USER_ID" with your actual values.
- Find the handleCheckClick function in HabitList.js.
Inside it, after the if (updatedGoalDays === 0)
block, call the sendHabitCompletionEmail function.

Bonus: To display the most recent completed
habits at the top of the History tab.

Step 1: Duplicate the habits Array

- Create a new array (reversedHabits) by spreading 
the elements of the habits array and then
reverse the order.

Step 2: Update the Map Function to Use reversedHabits

- Change the mapping function to use the reversedHabits
array instead of the original habits array.




