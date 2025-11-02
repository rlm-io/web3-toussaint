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
    await sendApiRequestandHandleError("POST", "expenses/reset");
    navigate("/list");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>

      <ExpenseAdd
        addExpense={handleAddExpense}
        handleResetData={handleResetData}
      />
      {error && <div>Error: {error}</div>}
    </div>
  );
}
