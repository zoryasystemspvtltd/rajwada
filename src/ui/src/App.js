import AuthProvider from "./provider/authProvider";
import { ToastContainer, Bounce } from "react-toastify";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </AuthProvider>
  );
}

export default App;
