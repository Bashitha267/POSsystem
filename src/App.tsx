import './App.css'
import { Bill } from './Components/Bill'
import { ItemPage } from './Components/ItemPage'
import { SideMenu } from './Components/SideMenu'

function App() {

  return (
  <div className='grid grid-cols-4 '>
    <div className='bg-amber-200'>
      <SideMenu/>
    </div>
    <div className='col-span-2 bg-red-300'>
      <ItemPage/>
    </div>
    <div className='bg-amber-500'>
      <Bill/>
    </div>

  </div>
  )
}

export default App
