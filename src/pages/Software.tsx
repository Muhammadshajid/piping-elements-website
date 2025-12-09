import { Link } from 'react-router-dom';
import {
  Code,
  CheckCircle,
  Scissors,
  Layers,
  ClipboardCheck,
  TruckIcon,
  Box,
  FileText,
  Zap,
  ArrowRight,
} from 'lucide-react';

export function Software() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              Authorized Software Solutions to Streamline Piping Fabrication Across GCC
            </h1>
            <p className="text-xl text-blue-100">
              Optimize every stage of piping fabrication—from drawing, material control, cutting,
              fit-up, welding, NDE, coating, to dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-6">Transform Your Fabrication Workflow</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Piping Elements is the authorized distributor of PipeCloud, Pipesurf, and SpoolCAD in
              the GCC region. These software solutions optimize every stage of piping
              fabrication—from drawing development, material control, cutting, and fit-up, to
              welding, NDE, coating, and dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 mb-2">GCC Authorized</h3>
              <p className="text-gray-600">Official distributor with local support and training</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 mb-2">Complete Integration</h3>
              <p className="text-gray-600">Seamless connection with your existing ERP and systems</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">Trusted by leading fabricators across the region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pipesurf */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white">Pipesurf</h2>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    GCC Authorized*
                  </span>
                </div>
                <p className="text-xl text-blue-100">Complete Fabrication Management System</p>
              </div>

              <div className="p-8">
                <p className="text-gray-600 mb-6">
                  End-to-end software solution for managing the entire piping fabrication workflow
                  from material receipt to final dispatch.
                </p>

                <h3 className="text-gray-900 mb-4">Key Features:</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <Scissors className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Cutting & Nesting Plans</p>
                      <p className="text-gray-500">
                        Optimize material usage with automated cutting plans
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Layers className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Fit-Up & Welding Scheduling</p>
                      <p className="text-gray-500">
                        Track production stages and resource allocation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ClipboardCheck className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">NDE Tracking</p>
                      <p className="text-gray-500">
                        Manage inspection schedules and quality documentation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <TruckIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Dispatch & Logistics</p>
                      <p className="text-gray-500">
                        Coordinate delivery schedules and shipping documentation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Real-Time Reporting</p>
                      <p className="text-gray-500">Production analytics and progress tracking</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
                >
                  Request Demo
                </Link>
              </div>
            </div>

            {/* SpoolCAD */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white">SpoolCAD</h2>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    GCC Authorized*
                  </span>
                </div>
                <p className="text-xl text-indigo-100">3D Spool Design & Documentation</p>
              </div>

              <div className="p-8">
                <p className="text-gray-600 mb-6">
                  Advanced 3D modeling software specifically designed for piping spool fabrication,
                  BOM generation, and shop documentation.
                </p>

                <h3 className="text-gray-900 mb-4">Key Features:</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <Box className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">3D Spool Modeling</p>
                      <p className="text-gray-500">
                        Create accurate 3D models from isometric drawings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">BOM Generation</p>
                      <p className="text-gray-500">
                        Automatic bill of materials with material specifications
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ClipboardCheck className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Welding Documentation</p>
                      <p className="text-gray-500">Generate weld maps and inspection records</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Zap className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">ERP Integration</p>
                      <p className="text-gray-500">
                        Seamless data exchange with enterprise systems
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Scissors className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Shop Drawings</p>
                      <p className="text-gray-500">
                        Generate detailed fabrication drawings automatically
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="block w-full px-6 py-3 bg-indigo-600 text-white text-center rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              * Authorization details will be confirmed based on product availability and regional
              distribution agreements
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why Choose Our Software Solutions?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-gray-900 mb-2">30-50% Faster</h3>
              <p className="text-gray-600">Production time reduction through digitalization</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-gray-900 mb-2">95% Accuracy</h3>
              <p className="text-gray-600">Eliminate manual errors in material and welding data</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-gray-900 mb-2">Real-Time Visibility</h3>
              <p className="text-gray-600">Track production progress and bottlenecks instantly</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-gray-900 mb-2">Cost Savings</h3>
              <p className="text-gray-600">Reduce waste, rework, and administrative overhead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Support */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Complete Implementation Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just sell software—we ensure successful implementation and adoption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-gray-900 mb-3">Training & Onboarding</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>On-site training sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>User manuals and documentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Video tutorials</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-gray-900 mb-3">Technical Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Local GCC support team</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Remote assistance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Software updates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-gray-900 mb-3">Customization</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Workflow configuration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Report templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>System integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Code className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-white mb-6">
            Request a Demo Today to Transform Your Fabrication Workflow
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            See our software in action and discover how it can optimize your operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Request Software Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-md hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
