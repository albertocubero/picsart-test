import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "@/ui/list/List";
import ImageDetail from "@/ui/ImageDetail/ImageDetail";
import NotFound from "@/ui/404/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/image/:id" element={<ImageDetail />} />
        <Route path="/" element={<List />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
