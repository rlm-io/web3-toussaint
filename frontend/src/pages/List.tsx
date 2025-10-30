interface TempProps {
  setCurrentPage: (page: string) => void;
}

export default function List({ setCurrentPage }: TempProps) {
  return (
    <div>
      <h2>Expense List</h2>

      <button onClick={() => setCurrentPage("Welcome")}>Back</button>
      <button onClick={() => setCurrentPage("Add")}>Go to Add</button>
    </div>
  );
}
