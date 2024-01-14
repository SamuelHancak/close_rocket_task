import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Values from "./components/Values.tsx";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Values />
    </QueryClientProvider>
  );
};

export default App;
