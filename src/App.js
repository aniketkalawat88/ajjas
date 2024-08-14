import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DateRange from './pages/DateRange';

function App() {
  
  return (
    <div className="App bg-black text-white min-h-screen">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/DateRange/:id' element={<DateRange />} />
      </Routes>
        
    </div>
  );
}

export default App;
