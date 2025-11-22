
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SectionDetail } from './pages/SectionDetail';
import { Admin } from './pages/Admin';
import { ContentProvider } from './context/ContentContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <ContentProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin route outside main layout for full screen capability, or inside if preferred. keeping inside for now to maintain nav access */}
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/section/:id" element={<Layout><SectionDetail /></Layout>} />
        </Routes>
      </HashRouter>
    </ContentProvider>
  );
}
