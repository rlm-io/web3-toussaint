import { useState } from "react";
import "./App.css";
import List from "./pages/List";
import Welcome from "./pages/Welcome";
import Add from "./pages/Add";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("Welcome");

  if (currentPage == "Add") {
    return <Add setCurrentPage={setCurrentPage} />;
  }

  if (currentPage == "List") {
    return <List setCurrentPage={setCurrentPage} />;
  }

  return <Welcome setCurrentPage={setCurrentPage} />;
}

export default App;
