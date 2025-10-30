interface TempProps {
    setCurrentPage: (page: string) => void;
}

export default function Welcome({ setCurrentPage }: TempProps) {
  return (
    <div>
      <h1>Welcome to the Expense Tracker App</h1>
      <p>Use the navigation to add and view your expenses.</p>
      <button onClick={() => setCurrentPage('List')}>Go to List</button>
      <button onClick={() => setCurrentPage('Add')}>Go to Add</button>
    </div>
  );
}