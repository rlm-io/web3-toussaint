interface TempProps {
  setCurrentPage: (page: string) => void;
}

export default function Add({ setCurrentPage }: TempProps) {
  return (
    <div>
      <h2>Add Expense</h2>

      <button onClick={() => setCurrentPage("Welcome")}>Back</button>
      <button onClick={() => setCurrentPage("List")}>Go to List</button>
    </div>
  );
}
