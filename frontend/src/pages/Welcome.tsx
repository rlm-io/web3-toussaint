import { NavLink } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="text-center">
      <h1 className="text-5xl">Welcome to the Expense Tracker App</h1>
      <div className="text-center py-12">
        Use the navigation to add and view your expenses.
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <button className="bg-green-800 text-white hover:bg-green-700 rounded-full px-6">
          <NavLink to="/list">View Expenses</NavLink>
        </button>
        <button className="bg-green-800 text-white hover:bg-green-700 rounded-full px-6">
          <NavLink to="/add">Add Expense</NavLink>
        </button>
      </div>
    </div>
  );
}
