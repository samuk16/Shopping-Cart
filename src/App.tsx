import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-full">
        <Header />p
      </div>
    </ThemeProvider>
  );
}

export default App;
