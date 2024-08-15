import Bikes from "./Bikes";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <div className='bg-base-200'>
            <Navbar></Navbar>
            <Bikes></Bikes>
            <Footer></Footer>
        </div>
    );
};

export default Home;