import { Link } from 'react-router-dom';
import { Package, Compass, Users, ArrowRight } from 'lucide-react';

export function Services() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              Comprehensive Technical, Procurement, and Advisory Solutions for the Energy & EPC
              Sector
            </h1>
            <p className="text-xl text-blue-100">
              From supply chain management to senior-level engineering guidance, we support every
              phase of your project lifecycle.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Supply Chain & Procurement */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Package className="h-20 w-20 text-white" />
              </div>
              <div className="p-8">
                <h2 className="text-gray-900 mb-4">Supply Chain & Procurement</h2>
                <p className="text-gray-600 mb-6">
                  Efficient material sourcing, vendor management, QA/QC compliance, and logistics
                  optimization for EPC and fabrication projects.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Material sourcing and vendor selection</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>QA/QC compliance and documentation</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Logistics and cost optimization</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Project procurement support</span>
                  </li>
                </ul>
                <Link
                  to="/services/supply-chain"
                  className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Engineering Consultancy */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <Compass className="h-20 w-20 text-white" />
              </div>
              <div className="p-8">
                <h2 className="text-gray-900 mb-4">Engineering Consultancy</h2>
                <p className="text-gray-600 mb-6">
                  Multi-discipline engineering guidance from top industry professionals for
                  planning, fabrication, and execution excellence.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Piping & structural design review</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Welding & NDE planning</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Fabrication workflow optimization</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Estimation, MTO & scheduling</span>
                  </li>
                </ul>
                <Link
                  to="/services/engineering-consultancy"
                  className="block w-full px-6 py-3 bg-indigo-600 text-white text-center rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Senior Expert Advisory */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Users className="h-20 w-20 text-white" />
              </div>
              <div className="p-8">
                <h2 className="text-gray-900 mb-4">Senior Expert Advisory</h2>
                <p className="text-gray-600 mb-6">
                  Access retired EPC managers, PhDs, and industry specialists for strategic
                  guidance and technical problem-solving.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>On-demand expert consultation</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Technical problem solving</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Project risk mitigation</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <ArrowRight className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Knowledge transfer programs</span>
                  </li>
                </ul>
                <Link
                  to="/services/senior-expert-advisory"
                  className="block w-full px-6 py-3 bg-purple-600 text-white text-center rounded-md hover:bg-purple-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven expertise, practical solutions, and measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">35+</div>
              <h3 className="text-gray-900 mb-2">Years Combined Experience</h3>
              <p className="text-gray-600">
                Our team brings decades of hands-on EPC project experience
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">100+</div>
              <h3 className="text-gray-900 mb-2">Projects Supported</h3>
              <p className="text-gray-600">
                From mega oil & gas projects to fabrication workshops
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">50+</div>
              <h3 className="text-gray-900 mb-2">Senior Advisors</h3>
              <p className="text-gray-600">
                Network of retired managers and PhD specialists
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">6</div>
              <h3 className="text-gray-900 mb-2">GCC Countries</h3>
              <p className="text-gray-600">Regional presence with local market knowledge</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Not sure which service is right for you?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule a consultation with our team to discuss your specific needs.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
