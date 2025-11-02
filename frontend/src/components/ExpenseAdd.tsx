import type { ExpenseInput } from "../types/Expense";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const form = useForm<FormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { description: '', payer: 'Alice' },
  });

  const onSubmit = async ({ description, payer, amount }: FormData) => {
    await addExpense({ description, payer, amount, date: new Date().toISOString() });
    form.reset();
  };

  const isSubmitDisabled = form.formState.isSubmitting || !form.formState.isValid;
  

  return (

 <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payer</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Alice">Alice</SelectItem>
                          <SelectItem value="Bob">Bob</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" step={0.01} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitDisabled} variant="default">
                  {form.formState.isSubmitting ? 'Adding...' : 'Add'}
                </Button>

                <Button type="button" onClick={handleResetData} variant="destructive">
                  Reset Data
                </Button>
              </div>
            </form>
          </Form>
  );
}
