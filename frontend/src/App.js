import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './pages/ProductPage';
import CheckOutPage from './pages/CheckOutPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavBar';
import UserDetails from './pages/UserDetails';
import ErrorBoundary from './components/ErrorBoundry';

function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
    <div className="App">
      <NavigationBar/>
      <div className="page-body">
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/home" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/order" element={<OrderDetailsPage />} />
          <Route path="/newUser" element={<UserDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
