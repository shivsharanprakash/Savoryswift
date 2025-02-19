import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Signup from './pages/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import Myorders from './pages/Myorders.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myorder' element={<PrivateRoute element={<Myorders />} />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
