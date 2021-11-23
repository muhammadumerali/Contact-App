import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './pages/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
