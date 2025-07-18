import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Bill } from "./Components/Bill";
import { SideMenu } from './Components/SideMenu';
import { Add } from './Pages/Add';
import { Chart } from './Pages/Chart';
import { History } from './Pages/History';
import { Home } from './Pages/Home';
import { User } from "./Pages/User";
function App() {
// bg-[#252836]
  return (
<BrowserRouter>
<div className='ml-32flex bg-[#252836] mr-52 mx-auto'>
  <SideMenu/>
  <Bill/>
  <div className="ml-36  p-4 mx-auto mr-36">
    <Routes>
      <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/add" element={<Add />} />
            <Route path="/user" element={<User/>}/>
    </Routes>
  </div>
</div>




</BrowserRouter>
  )
}

export default App
