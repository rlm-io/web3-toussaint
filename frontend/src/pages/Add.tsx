import { useContext } from "react";
import { PageContext } from "../App";
import type { ExpenseInput } from "../types/Expense";
import ExpenseAdd from "../components/ExpenseAdd";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();
  const { error, sendApiRequestandHandleError } = useContext(PageContext);

  const handleAddExpense = async ({
    description,
    payer,
    amount,
  }: ExpenseInput) => {
    const newExpense: ExpenseInput = {
      description,
      payer,
      amount,
      date: new Date().toISOString(),
    };
    await sendApiRequestandHandleError("POST", "expenses", newExpense);
    navigate("/list");
  };

  const handleResetData = async () => {
    await sendApiRequestandHandleError('POST', 'expenses/reset');
    navigate('/list');
  };

  return (
    <div>
      <h2>Add Expense</h2>

      <ExpenseAdd addExpense={handleAddExpense} />
      {error && <div>Error: {error}</div>}
        <button onClick={handleResetData}>Reset Data</button>
    </div>
  );
}
