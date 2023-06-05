import { Outlet } from 'react-router-dom'
import { useDarkMode } from 'usehooks-ts';

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`h-full ${ isDarkMode ? 'dark' : 'light'}`}>
      <Outlet />
    </div>
  )
}

export default App
