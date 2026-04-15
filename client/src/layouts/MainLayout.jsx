// import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const MainLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//       <Footer/>
//     </div>
//   );
// };

// export default MainLayout;


import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;