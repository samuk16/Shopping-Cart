import { ThemeProvider } from '@/components/theme-provider'
// import './styles/App.css'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> 
    <div className='h-screen w-full'>
      <ModeToggle />
      
        <Button>test</Button>
      
    </div>
    </ThemeProvider>
  )
}

export default App
