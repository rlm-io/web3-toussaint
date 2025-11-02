import type { ExpenseInput } from "../types/Expense";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => Promise<void>;
  handleResetData: () => Promise<void>;
}

const expenseSchema = z.object({
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .min(3, "Description must be at least 3 characters long")
    .or(z.literal("")),
  payer: z.enum(["Alice", "Bob"], {
    error: "Payer must be either Alice or Bob",
  }),
  amount: z.coerce
    .number<number>()
    .gt(0, { message: "Amount must be a positive number" }),
});

type FormData = z.infer<typeof expenseSchema>;
export default function ExpenseAdd({ addExpense, handleResetData }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = async ({ description, payer, amount }: FormData) => {
    await addExpense({ description, payer, amount, date: new Date().toISOString() });
    reset();
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white rounded-lg shadow p-6 space-y-6"
    >
      <div>
        <label className="block font-medium mb-1" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          {...register('description')}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-700"
        />
        {errors.description && (
          <span className="text-red-600 text-sm">{errors.description.message}</span>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="payer">
          Payer
        </label>
        <select
          id="payer"
          {...register('payer')}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-700"
        >
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
        {errors.payer && (
          <span className="text-red-600 text-sm">{errors.payer.message}</span>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step={0.01}
          min={0}
          placeholder="Enter amount"
          {...register('amount')}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-700"
        />
        {errors.amount && (
          <span className="text-red-600 text-sm">{errors.amount.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-800 text-white font-bold py-3 rounded hover:bg-green-700 transition-colors text-lg"
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>

      <button
        onClick={handleResetData}
        className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded hover:bg-red-500 transition-colors"
      >
        Reset Data
      </button>
    </form>
  );
}