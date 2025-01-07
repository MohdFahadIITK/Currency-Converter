import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConvertedPage from './ConvertedPage';
import NewPage from './NewPage';
function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<NewPage />} />
        <Route path="/ConvertedPage" element={<ConvertedPage />} />
      </Routes>
    </Router>
  );
}

export default App
