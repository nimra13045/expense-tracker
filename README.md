💰 Expense Tracker
A responsive Expense Tracker web application built with
React.js.
This project allows users to manage their income and expenses, view
expense summaries, search and filter transactions, and switch between
light and dark modes.

🚀 Features
💰 Add and display user income

💸 Add new expenses

✏️ Edit existing expenses

🗑️ Delete expenses

📊 Calculate total expenses

🏦 Calculate remaining savings

🍔 Categorize expenses:

Food

Transport

Shopping

Bills

🔎 Search expenses by category

🎯 Filter transactions by category

🌙 Dark Mode / ☀️ Light Mode

💾 Save transactions using localStorage

📱 Responsive design for desktop, tablet, and mobile

🖼️ Custom Expense Tracker illustrations and logo

🛠️ Technologies Used
React.js

JavaScript (ES6+)

HTML5

CSS3

Vite

LocalStorage

⚛️ React Concepts Practiced
This project was created to practice important React concepts and hooks:

useState
Used for managing: - Income - Expense amount - Category - Description -
Search - Selected category - Edit state

useReducer
Used to manage transaction operations:

ADD

Edit

Delete

useEffect
Used to automatically save transactions to localStorage whenever
transaction data changes.

useMemo
Used to calculate the expense summary efficiently:

Total expense

Food expense

Transport expense

Shopping expense

Bills expense

useCallback
Used for memoizing transaction functions such as:

Delete transaction

Edit transaction

useRef
Used to directly focus form inputs, for example when a required field is
missing.

useContext
Used for managing the application's light/dark theme.

📊 Saving Calculation
The application calculates savings using:

const saving = Number(income || 0) - expensesummary.totalexpense
For example:

Income:   $70,000
Expense:  $50,000
Saving:   $20,000
If expenses are greater than income, the saving value becomes negative,
which represents a deficit.

📁 Project Structure
expense-tracker/
│
├── src/
│   ├── assets/
│   │   ├── MyImage.png
│   │   └── Image.png
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── themecontext.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── package-lock.json
├── index.html
└── README.md
File names may be slightly different depending on your project
structure.

⚙️ Installation
1. Clone the repository
git clone https://github.com/nimra13045/expense-tracker
2. Open the project
cd expense-tracker
3. Install dependencies
npm install
4. Start the development server
npm run dev
The application will normally be available at:

http://localhost:5173/
💾 Data Storage
Transactions are stored in the browser using LocalStorage.

The application saves transaction data under:

transaction
This means transactions remain available after refreshing the page, as
long as the browser's local storage is not cleared.

🔍 Search & Filter
Users can:

Search transactions by category.

Filter transactions using the category dropdown.

View matching transactions instantly.

🌙 Theme Support
The application supports:

☀️ Light Mode

🌙 Dark Mode

The theme is controlled using React Context.

📱 Responsive Design
The UI adapts to different screen sizes:

💻 Desktop

📱 Mobile

📟 Tablet

CSS media queries are used to adjust layouts, images, forms, and
transaction controls.

🎯 Project Purpose
This project was created as a React practice project to understand
how React Hooks work together in a real-world application.

It combines:

useState
   ↓
useReducer
   ↓
useEffect
   ↓
useMemo
   ↓
useCallback
   ↓
useRef
   ↓
useContext
into one practical project.

🔮 Future Improvements
Possible improvements for future versions:

Add income editing and persistence

Store income in localStorage

Add transaction dates

Add monthly expense reports

Add charts and graphs

Add budget limits

Add expense notifications

Add currency selection

Add authentication

Add backend/database support

Deploy the application online

👩‍💻 Author
Nimra Nazir

Built with ❤️ while learning and practicing React.js.

⭐ Contributing
If you have suggestions or improvements, feel free to fork the project
and create a pull request.

If you find this project useful, consider giving it a ⭐ on GitHub.