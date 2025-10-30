import { useContext } from "react";
import { PageContext } from "../App";

export default function Add() {
  const { setCurrentPage } = useContext(PageContext);

  return (
    <div>
      <h2>Add Expense</h2>

      <button onClick={() => setCurrentPage('welcome')}>Back</button>
      <button onClick={() => setCurrentPage('list')}>View Expenses</button>
    </div>
  );
}
