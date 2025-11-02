import { NavLink } from "react-router-dom";

export default function Welcome() {

  return (
    <div>
      <h1>Welcome to the Expense Tracker App</h1>
      <p>Use the navigation to add and view your expenses.</p>
            <div>
        <button >
          <NavLink to="/list">View Expenses</NavLink>
        </button>
        <button >
          <NavLink to="/add">Add Expense</NavLink>
        </button>
      </div>
    </div>
  );
}
