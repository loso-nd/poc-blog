import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import HomePage from './pages/HomePage';
import Navbar from "./Navbar";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
                  <Navbar />
        <div id="page-body">
          <Routes>
            <Route path="/" element ={<HomePage />} />
            <Route path="/about" element ={<AboutPage />} />
            <Route path="/articles" element ={<ArticlesListPage />} />
            <Route path="/articles/:articleId" element ={<ArticlePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;