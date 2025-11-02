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
    return <div>Loading expenses...</div>;
  }

  return (
    <div>
      <h2>Expense List</h2>

      <div>
        {error && <div>Error: {error}</div>}
        <h2>Expenses ({expenses.length})</h2>
        {expenses.length > 0 && (
          <ExpenseSorter setSortingAlgo={handleAlgoChange} />
        )}

        <div>
          {sortedExpenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Id</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Description</th>
                  <th className="text-left">Payer</th>
                  <th className="text-right">Amount</th>
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
    </div>
  );
}
