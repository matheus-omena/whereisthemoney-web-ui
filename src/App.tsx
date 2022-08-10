import moment from 'moment';
import "moment/locale/pt-br";
import { Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Spinner from './components/General/Spinner';
import AuthProvider from "./contexts/AuthContext";
import Routes from './routes';
import 'animate.css';

moment.locale("pt-br");

function App() {
  const fallback = (
    <div className="mt-5">
      <Spinner message="Aguarde" />
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <AuthProvider>
        <main className="">
          <ToastContainer autoClose={3000} />
          <Routes />
        </main>
      </AuthProvider>
    </Suspense>
  );
}

export default App
