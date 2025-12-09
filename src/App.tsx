import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { SupplyChain } from './pages/services/SupplyChain';
import { EngineeringConsultancy } from './pages/services/EngineeringConsultancy';
import { SeniorExpertAdvisory } from './pages/services/SeniorExpertAdvisory';
import { Software } from './pages/Software';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/supply-chain" element={<SupplyChain />} />
            <Route path="/services/engineering-consultancy" element={<EngineeringConsultancy />} />
            <Route path="/services/senior-expert-advisory" element={<SeniorExpertAdvisory />} />
            <Route path="/software" element={<Software />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
