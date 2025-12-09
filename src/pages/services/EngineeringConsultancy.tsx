import { Link } from 'react-router-dom';
import {
  Compass,
  Wrench,
  Layout,
  FileText,
  Calendar,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export function EngineeringConsultancy() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              Multi-Discipline Engineering Guidance from Top Industry Professionals
            </h1>
            <p className="text-xl text-indigo-100">
              From design review to fabrication optimization, we provide expert engineering
              consultancy across all phases of EPC and fabrication projects.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1573165067541-4cd6d9837902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbnN1bHRhbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzY0MzIyMTYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Engineering consultancy"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-gray-900 mb-6">Expert Engineering Support</h2>
              <p className="text-gray-600 mb-4">
                Engineering challenges don't always require full-time hires. Our engineering
                consultancy services give you on-demand access to senior-level technical expertise
                across multiple disciplines—piping, structural, welding, QA/QC, and more.
              </p>
              <p className="text-gray-600 mb-4">
                Whether you need a design review, fabrication workflow optimization, or guidance on
                complex technical issues, our consultants bring practical, hands-on solutions
                backed by decades of EPC experience.
              </p>
              <p className="text-gray-600">
                We work with contractors, fabricators, and project teams to improve efficiency,
                reduce rework, and ensure projects stay on schedule and within budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Our Engineering Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Piping & Structural Design Review */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Piping & Structural Design Review</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Piping layout optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Stress analysis review</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Structural steel design verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Code compliance checking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Drawing and specification review</span>
                </li>
              </ul>
            </div>

            {/* Welding & NDE Planning */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Welding & NDE Planning</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Welding Procedure Specification (WPS) review</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Welding consumable selection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>NDE method selection and planning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Quality control plan development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Welder qualification support</span>
                </li>
              </ul>
            </div>

            {/* Fabrication Workflow Optimization */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Compass className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Fabrication Workflow Optimization</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Shop layout design</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Production workflow analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bottleneck identification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Productivity improvement strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Quality system setup</span>
                </li>
              </ul>
            </div>

            {/* Estimation & MTO Review */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Estimation & MTO Review</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Material take-off (MTO) verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cost estimation review</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Man-hour budgeting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bid preparation support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Value engineering recommendations</span>
                </li>
              </ul>
            </div>

            {/* Project Scheduling */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Project Scheduling</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Master schedule development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fabrication sequence planning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Resource allocation optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Schedule recovery strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Progress tracking systems</span>
                </li>
              </ul>
            </div>

            {/* Other Disciplines */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Compass className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Other Disciplines</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>HSE planning and compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>QA/QC system development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Materials management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Commissioning and startup support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Digital transformation consulting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span>1</span>
              </div>
              <h3 className="text-gray-900 mb-2">Initial Consultation</h3>
              <p className="text-gray-600">
                Discuss your technical challenges and project requirements
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span>2</span>
              </div>
              <h3 className="text-gray-900 mb-2">Expert Assignment</h3>
              <p className="text-gray-600">We match you with the right consultant for your needs</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span>3</span>
              </div>
              <h3 className="text-gray-900 mb-2">Technical Review</h3>
              <p className="text-gray-600">Deep-dive analysis and solution development</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span>4</span>
              </div>
              <h3 className="text-gray-900 mb-2">Implementation Support</h3>
              <p className="text-gray-600">Ongoing guidance through project execution</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Need Engineering Expertise?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Connect with our senior engineering consultants to discuss your project challenges.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Talk to a Consultant <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
