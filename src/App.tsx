import { Outlet } from 'react-router-dom'
import PageLoader from './components/PageLoader'

function App() {

  return (
    <div className={`h-full`}>
      <PageLoader></PageLoader>
      <Outlet />
    </div>
  )
}

export default App
