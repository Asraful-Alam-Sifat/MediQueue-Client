import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";

const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
      <ToastContainer position="bottom-center" autoClose={1000} />
    </div>
  );
};

export default MainLayout;
