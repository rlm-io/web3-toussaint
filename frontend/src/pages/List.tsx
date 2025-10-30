import { useContext } from "react";
import { PageContext } from "../App";

export default function List() {
  const { setCurrentPage } = useContext(PageContext);

  return (
    <div>
      <h2>Expense List</h2>

      <button onClick={() => setCurrentPage('welcome')}>Back</button>
      <button onClick={() => setCurrentPage('add')}>Add Expense</button>
    </div>
  );
}
