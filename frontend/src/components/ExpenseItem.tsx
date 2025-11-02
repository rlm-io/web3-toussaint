import type { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
      <tr
        key={expense.id}
        className="hover:bg-green-100 transition-colors"
      >
        <td className="text-left px-4 py-2">{expense.date}</td>
        <td className="text-left px-4 py-2">{expense.description}</td>
        <td className="text-left px-4 py-2">Paid by <span>{expense.payer}</span></td>
        <td className="text-right px-4 py-2 font-semibold text-green-800">{expense.amount.toFixed(2)}</td>
      </tr>
  );
}
