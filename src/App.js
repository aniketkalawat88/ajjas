import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DateRange from './pages/DateRange';
import CustomRange from './pages/CustomRange';

function App() {
  
  return (
    <div className="App bg-black text-white min-h-screen nunito-sans-name">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/DateRange/:id' element={<DateRange />} />
        <Route path='/CustomRange' element={<CustomRange />} />
      </Routes>
        
    </div>
  );
}

export default App;
