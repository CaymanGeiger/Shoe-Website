import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoeForm from './Shoes/ShoeForm';
import ShoeDetail from './Shoes/ShoeDetail';
import ShoePage from './Shoes/ShoePage';
import FavoriteList from './Shoes/FavoriteList';
import AccountList from './Accounts/AccountList';
import AccountForm from './Accounts/AccountForm';
import AccountLogIn from './Accounts/AccountLogIn';
import AccountDetail from './Accounts/AccountDetail';
import LogoutButton from './Accounts/AccountLogOut';
import CartList from './Cart/CartList';
import MainPage from './MainPage';
import { useAuth } from './Auth/AuthContext';
import { ModalProvider } from './Accounts/SignInModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './ToastContext';
import Nav from './Nav';
import "./App.css"




function App() {
  const { isLoading } = useAuth();
  if (isLoading) {
        return <div>Loading...</div>;
    } else {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ModalProvider>
          <Nav />
          <div className=" appBody">
            <Routes>
                <Route path="/">
                    <Route index element={<MainPage />} />
                </Route>
                <Route path="shoes">
                    <Route index element={<ShoePage />} />
                    <Route path="create" element={<ShoeForm />} />
                    <Route path=":id" element={<ShoeDetail />} />
                    <Route path="favorites" element={<FavoriteList />} />
                </Route>
                <Route path="accounts">
                    <Route index element ={<AccountList />} />
                    <Route path="detail" element={<AccountDetail />} />
                    <Route path="form" element={<AccountForm />} />
                    <Route path="login" element={<AccountLogIn />} />
                    <Route path="logout" element={<LogoutButton />} />
                </Route>
                <Route path="cart">
                    <Route index element={<CartList />} />
                </Route>
            </Routes>
            <ToastContainer />
          </div>
        </ModalProvider>
      </ToastProvider>
    </BrowserRouter>
  );
    }
}

export default App;
