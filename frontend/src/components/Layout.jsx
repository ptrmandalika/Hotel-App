import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container min-h-screen bg-base-200">
        <div className="columns-1">
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
