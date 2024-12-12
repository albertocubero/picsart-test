import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./ui/list/List";
import ImageDetail from "./ui/ImageDetail/ImageDetail";

const App: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/image/:id" element={<ImageDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
