import { ThemeProvider } from "@/components/theme-provider";
import Header from "../Header";
function HomePage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-full">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
