import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Compass,
  Users,
  Code,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { trackPageView } from '../utils/api';

const experts = [
  {
    name: 'Dr. Rajesh Kumar',
    discipline: 'Piping Engineering',
    expertise: '35+ years in EPC projects, specializing in oil & gas piping design and fabrication.',
    image: 'https://images.unsplash.com/photo-1747811853874-c00a51195d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDIzOTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Ahmed Al-Mazrouei',
    discipline: 'Project Controls',
    expertise: 'Former EPC manager with expertise in scheduling, cost control, and procurement.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    name: 'Sarah Williams',
    discipline: 'QA/QC & Welding',
    expertise: 'PhD in materials science, 25+ years in quality assurance for energy sector.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    name: 'Mohammed Al-Harthi',
    discipline: 'Structural Engineering',
    expertise: 'Retired structural engineering lead with GCC mega-project experience.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
];

const blogPosts = [
  {
    title: 'Optimizing Supply Chain for EPC Projects in GCC',
    excerpt: 'Learn how to streamline procurement processes and reduce costs in large-scale energy projects.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MjcxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Supply Chain',
  },
  {
    title: 'The Future of Piping Fabrication Software',
    excerpt: 'Discover how digital solutions are transforming fabrication workflows across the GCC region.',
    image: 'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGlwaW5nJTIwc3RlZWwlMjBmYWJyaWNhdGlvbnxlbnwxfHx8fDE3NjQzMjIxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Digital Transformation',
  },
  {
    title: 'Why Senior Advisory Matters in Complex Projects',
    excerpt: 'Understanding the value of experienced engineering consultants in risk mitigation.',
    image: 'https://images.unsplash.com/photo-1573165067541-4cd6d9837902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbnN1bHRhbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzY0MzIyMTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Advisory',
  },
];

export function Home() {
  // Track page view on mount
  useEffect(() => {
    trackPageView('/');
  }, []);

  const [currentExpert, setCurrentExpert] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExpert((prev) => (prev + 1) % experts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextExpert = () => {
    setCurrentExpert((prev) => (prev + 1) % experts.length);
  };

  const prevExpert = () => {
    setCurrentExpert((prev) => (prev - 1 + experts.length) % experts.length);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGlwaW5nJTIwc3RlZWwlMjBmYWJyaWNhdGlvbnxlbnwxfHx8fDE3NjQzMjIxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="mb-6">
              Engineering Intelligence | Supply Chain Expertise | Digital Innovation
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Supporting EPC, oil & gas, and fabrication companies with senior-level consulting,
              end-to-end supply chain solutions, and GCC-authorized software for piping fabrication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Explore Services
              </Link>
              <Link
                to="/contact"
                className="px-6 sm:px-8 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Verticals Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Our Core Verticals</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for the energy and EPC sector
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Supply Chain & Procurement</h3>
              <p className="text-gray-600 mb-4">
                Efficient material sourcing, vendor management, and project support.
              </p>
              <Link
                to="/services/supply-chain"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Compass className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Engineering Consultancy</h3>
              <p className="text-gray-600 mb-4">
                Multi-discipline engineering guidance for planning, fabrication, and execution.
              </p>
              <Link
                to="/services/engineering-consultancy"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Senior Expert Advisory</h3>
              <p className="text-gray-600 mb-4">
                Access retired EPC managers, PhDs, and industry specialists.
              </p>
              <Link
                to="/services/senior-expert-advisory"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Software Solutions</h3>
              <p className="text-gray-600 mb-4">
                GCC-authorized software: Pipesurf and SpoolCAD.
              </p>
              <Link
                to="/software"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Piping Elements */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why Piping Elements?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Senior Expertise</h3>
              <p className="text-gray-600">
                Access to retired EPC leaders and industry PhDs with decades of experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">End-to-End Solutions</h3>
              <p className="text-gray-600">
                From procurement to engineering to digital tools—complete project support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Trusted by Contractors</h3>
              <p className="text-gray-600">
                Proven track record with Tier-1, 2, and 3 contractors across GCC.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Authorized Software Partner</h3>
              <p className="text-gray-600">
                GCC-authorized distributor for leading piping fabrication software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experts Carousel */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Featured Experts</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Connect with our senior advisory panel
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={experts[currentExpert].image}
                  alt={experts[currentExpert].name}
                  className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-gray-900 mb-2">{experts[currentExpert].name}</h3>
                  <p className="text-blue-600 mb-4">{experts[currentExpert].discipline}</p>
                  <p className="text-gray-600 mb-6">{experts[currentExpert].expertise}</p>
                  <Link
                    to="/contact"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevExpert}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous expert"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>
            <button
              onClick={nextExpert}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next expert"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {experts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExpert(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentExpert ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to expert ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Software Solutions Overview */}
      <section className="py-16 sm:py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white mb-6">GCC-Authorized Software Solutions</h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-6">
                Streamline your piping fabrication process from drawing to dispatch with our
                GCC-authorized software solutions.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-blue-50">
                    <span className="text-white">PipeCloud:</span> Cloud-based project management
                    and collaboration
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-blue-50">
                    <span className="text-white">Pipesurf:</span> Complete fabrication management
                    from cutting to dispatch
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-blue-50">
                    <span className="text-white">SpoolCAD:</span> 3D modeling, BOM generation, and
                    ERP integration
                  </p>
                </div>
              </div>
              <Link
                to="/software"
                className="inline-block px-6 sm:px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                View All Software
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg text-center">
                <div className="text-3xl sm:text-4xl mb-2">☁️</div>
                <h3 className="text-white mb-2">PipeCloud</h3>
                <p className="text-blue-100">Cloud-Based Solution</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg text-center">
                <div className="text-3xl sm:text-4xl mb-2">📊</div>
                <h3 className="text-white mb-2">Pipesurf</h3>
                <p className="text-blue-100">Fabrication Management</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg text-center lg:col-span-1 col-span-2">
                <div className="text-3xl sm:text-4xl mb-2">🔧</div>
                <h3 className="text-white mb-2">SpoolCAD</h3>
                <p className="text-blue-100">3D Spool Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights & Blogs */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Latest Insights & Blog</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Expert knowledge and industry updates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-block px-6 sm:px-8 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Explore More Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Need guidance from senior EPC professionals?</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Connect with our expert advisory panel for personalized support on your projects.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 sm:px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}