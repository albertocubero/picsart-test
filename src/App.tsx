import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./ui/list/List";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
