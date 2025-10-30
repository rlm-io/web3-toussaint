import { createContext, useEffect, useState } from "react";
import "./App.css";
import List from "./pages/List";
import Welcome from "./pages/Welcome";
import Add from "./pages/Add";

// eslint-disable-next-line react-refresh/only-export-components
export const PageContext = createContext<{
  currentPage: string;
  setCurrentPage: (page: string) => void;
}>({
  currentPage: 'error',
  setCurrentPage: () => {throw new Error("context not definded");},
});

const pages: { [key: string]: React.FunctionComponent } = {
  'welcome': Welcome,
  'list': List,
  'add': Add,
};

function App() {
  const [currentPage, setCurrentPage] = useState<string>('welcome');
  const CurrentPageComponent = pages[currentPage];

  useEffect(() => {
    const syncFromPath = () => {
      const raw = window.location.pathname.replace(/^\//, '').toLowerCase();
      const pageKey = pages[raw] ? raw : 'welcome';
      setCurrentPage(pageKey);
    };

    // initial sync from current URL
    syncFromPath();

    // update on browser navigation (back/forward)
    const onPop = () => syncFromPath();
    window.addEventListener('popstate', onPop);

    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function handlePageChange(page: string) {
    window.history.pushState(null, page, `/${page.toLowerCase()}`);
    setCurrentPage(page);
  }

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage: handlePageChange }}>
      <CurrentPageComponent />
    </PageContext.Provider>
  );
}

export default App;
