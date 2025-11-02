import { createContext, useState } from "react";
import "./App.css";
import List from "./pages/List";
import Welcome from "./pages/Welcome";
import Add from "./pages/Add";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

// eslint-disable-next-line react-refresh/only-export-components
export const PageContext = createContext<{
  error: string | null;
  sendApiRequestandHandleError: <T = unknown>(
    method: string,
    path: string,
    body?: unknown
  ) => Promise<T | undefined>;
}>({
  error: "context not defined",
  sendApiRequestandHandleError: async () => {
    throw new Error("context not defined");
  },
});

function App() {
  const [error, setError] = useState<string | null>(null);

  const sendApiRequestandHandleError = async <T = unknown>(
    method: string = "GET",
    path: string,
    body?: unknown
  ): Promise<T | undefined> => {
    try {
      
      const response = await fetch(`${host}/api/${path}`, {
        method: method,
        headers: body ? { "Content-Type": "application/json" } : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json() as T;
    } catch (error) {
      console.error("API request failed:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const context = {
    error,
    sendApiRequestandHandleError,
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: 'list',
          element: <List />,
        },
        {
          path: 'add',
          element: <Add />,
        },
      ],
    },
  ]);

  return (
    <PageContext.Provider value={context}>
      <RouterProvider router={router} />
    </PageContext.Provider>
  );
}

export default App;
