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
  return (
    <BrowserRouter>
      <div className="flex bg-[#252836] min-h-screen overflow-x-hidden">
        {/* Sidebar */}
        <SideMenu />

        {/* Main content */}
        <div className="max-w-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/add" element={<Add />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>

        {/* Bill Panel */}
        <Bill />
      </div>
    </BrowserRouter>
  );
}

export default App;
