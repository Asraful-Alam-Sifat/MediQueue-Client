import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/NavBar/NavBar";



const MainLayout = ({children}) => {
    return (
        <div>
            <NavBar/>
            {children}
            <Footer/>
        </div>
    );
};

export default MainLayout;