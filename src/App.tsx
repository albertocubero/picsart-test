import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gallery from "@/ui/galleryPage/Gallery";
import ImageDetail from "@/ui/detailPage/DetailPage";
import NotFound from "@/ui/404/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/image/:id" element={<ImageDetail />} />
        <Route path="/" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
