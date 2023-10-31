import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoeList from './Shoes/ShoeList';
import ShoeForm from './Shoes/ShoeForm';
import ShoeDetail from './Shoes/ShoeDetail';
import ShoePage from './Shoes/ShoePage';
import FavoriteList from './Shoes/FavoriteList';
import BinForm from './Bins/BinForm';
import AccountList from './Accounts/AccountList';
import AccountForm from './Accounts/AccountForm';
import AccountLogIn from './Accounts/AccountLogIn';
import LogoutButton from './Accounts/AccountLogOut';
import MainPage from './MainPage';
import { useAuth } from './Auth/AuthContext';
import { ModalProvider } from './Accounts/SignInModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './ToastContext';
import SignUpScreen from './Shoes/ShoeForm1';
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
                    <Route index element={<ShoeList />} />
                    <Route path="create" element={<ShoeForm />} />
                    <Route path=":id" element={<ShoeDetail />} />
                    <Route path="page" element={<ShoePage />} />
                    <Route path="favorites" element={<FavoriteList />} />
                    <Route path="new" element={<SignUpScreen />} />
                </Route>
                <Route path="bins">
                    <Route index element ={<BinForm />} />
                </Route>
                <Route path="accounts">
                    <Route index element ={<AccountList />} />
                    <Route path="form" element={<AccountForm />} />
                    <Route path="login" element={<AccountLogIn />} />
                    <Route path="logout" element={<LogoutButton />} />
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
