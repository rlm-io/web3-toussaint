import { useContext } from "react";
import { PageContext } from "../App";

export default function Welcome() {
  const { setCurrentPage } = useContext(PageContext);

  return (
    <div>
      <h1>Welcome to the Expense Tracker App</h1>
      <p>Use the navigation to add and view your expenses.</p>
      <button onClick={() => setCurrentPage('list')}>View Expenses</button>
      <button onClick={() => setCurrentPage('add')}>Add Expense</button>
    </div>
  );
}
