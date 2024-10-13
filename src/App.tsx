import { ThemeProvider } from "@/components/theme-provider";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-full"></div>
    </ThemeProvider>
  );
}

export default App;
