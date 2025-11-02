import { useContext, useEffect, useState } from "react";
import { PageContext } from "../App";
import type { Expense } from "../types/Expense";
import ExpenseSorter from "../components/ExpenseSorter";
import ExpenseItem from "../components/ExpenseItem";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultAlgo = (_a: Expense, _b: Expense) => 0; // Default no sorting

export default function List() {
  const [sortingAlgo, setSortingAlgo] = useState<
    (a: Expense, b: Expense) => number
  >(() => defaultAlgo);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, sendApiRequestandHandleError } = useContext(PageContext);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = (await sendApiRequestandHandleError("GET", "expenses")) as
        | Expense[]
        | undefined;
      setExpenses(data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // Pay attention here, we're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = expenses.sort(sortingAlgo);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="animate-pulse text-green-800 text-xl">
          Loading expenses...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-green-900 mb-2 text-center">
        Expense List
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
          Error: {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-green-800">
          Expenses <span className="text-gray-600">({expenses.length})</span>
        </h2>
        {expenses.length > 0 && (
          <ExpenseSorter setSortingAlgo={handleAlgoChange} />
        )}
      </div>

      <div className="mx-auto bg-white rounded-lg shadow p-6 space-y-6 overflow-x-auto">
        {sortedExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Description</th>
                <th className="text-left px-4 py-2">Payer</th>
                <th className="text-right px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
