import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

export default function PageLayout() {
  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100 flex flex-col">
        <Header />
        PageLayout
        <div className="flex flex-1">
          <Sidebar />
          <MainContent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
