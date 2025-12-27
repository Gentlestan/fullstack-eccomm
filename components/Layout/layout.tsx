import { ReactNode } from "react"
import Header from "./Header";
import Footer from "./Footer"; // make sure Footer exists


interface LayoutProps {
  children: ReactNode; // this is the important part
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
     <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
       <Footer /> 
    </>
  );
};

export default Layout;
