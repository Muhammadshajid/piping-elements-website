import { Link } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  UserCheck,
  FileSearch,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const expertDisciplines = [
  {
    icon: '🔧',
    title: 'Piping Engineering',
    description: 'Layout design, stress analysis, material selection, and code compliance',
  },
  {
    icon: '⚡',
    title: 'Welding Engineering',
    description: 'WPS development, procedure qualification, metallurgy, and defect analysis',
  },
  {
    icon: '✓',
    title: 'QA/QC',
    description: 'Quality systems, inspection planning, audit support, and documentation',
  },
  {
    icon: '🏗️',
    title: 'Structural Engineering',
    description: 'Steel design, load analysis, foundation design, and structural integrity',
  },
  {
    icon: '🛡️',
    title: 'HSE',
    description: 'Safety planning, risk assessment, incident investigation, and compliance',
  },
  {
    icon: '📦',
    title: 'Procurement',
    description: 'Sourcing strategy, vendor management, contract negotiation, and cost control',
  },
  {
    icon: '📊',
    title: 'Project Controls',
    description: 'Scheduling, cost management, progress tracking, and reporting',
  },
  {
    icon: '🚀',
    title: 'Startup & Commissioning',
    description: 'Pre-commissioning, startup planning, handover, and performance testing',
  },
];

const useCases = [
  {
    title: 'Tier-1/2/3 Contractors',
    description:
      'Supplement your team with senior advisors during peak periods or for specialized challenges.',
  },
  {
    title: 'Fabrication Shops',
    description: 'Get expert guidance on workflow optimization, quality systems, and technical issues.',
  },
  {
    title: 'Startups & New Entrants',
    description:
      'Access decades of industry knowledge to build your business with confidence.',
  },
  {
    title: 'Owner Companies',
    description: 'Independent technical reviews and expert opinions for major project decisions.',
  },
];

export function SeniorExpertAdvisory() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              Access the Knowledge of Retired EPC Managers, PhDs, and Specialists
            </h1>
            <p className="text-xl text-purple-100">
              Get on-demand access to senior industry experts who have led billion-dollar projects
              and solved the toughest technical challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gray-900 mb-6">Why Senior Advisory Matters</h2>
              <p className="text-gray-600 mb-4">
                Complex projects often require more than standard engineering services—they need the
                wisdom and experience that comes from decades in the field.
              </p>
              <p className="text-gray-600 mb-4">
                Our Senior Expert Advisory panel consists of retired EPC managers, PhD-level
                specialists, and industry veterans who have worked on some of the world's largest
                oil & gas, petrochemical, and power projects.
              </p>
              <p className="text-gray-600 mb-4">
                Whether you're facing a technical roadblock, need a second opinion, or want
                strategic guidance on project execution, our experts provide practical,
                battle-tested solutions.
              </p>
              <p className="text-gray-600">
                No full-time commitment required—just expert knowledge when you need it most.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1749549437525-3b5aa46fa1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBnYXMlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NjQyNjEzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Industry expert"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and effective expert access</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-3">1. Submit Your Query</h3>
              <p className="text-gray-600">
                Describe your technical challenge, project requirement, or question through our
                contact form or direct message.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-3">2. Expert Assignment</h3>
              <p className="text-gray-600">
                We match you with the most qualified expert from our advisory panel based on their
                specialization and experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSearch className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-3">3. Consultation</h3>
              <p className="text-gray-600">
                Schedule a call, video conference, or workshop with your assigned expert to discuss
                your needs in detail.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-3">4. Project Support</h3>
              <p className="text-gray-600">
                Get ongoing guidance, follow-up consultations, and support throughout project
                execution as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Disciplines Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Expert Disciplines</h2>
            <p className="text-xl text-gray-600">Access specialists across all major disciplines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertDisciplines.map((discipline, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-3">{discipline.icon}</div>
                <h3 className="text-gray-900 mb-2">{discipline.title}</h3>
                <p className="text-gray-600">{discipline.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Who Benefits from Our Advisory Services?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">What You Get</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-3">Proven Experience</h3>
              <p className="text-gray-600">
                Advisors with 25-40 years of hands-on experience in major EPC projects
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-3">Practical Solutions</h3>
              <p className="text-gray-600">
                Real-world guidance based on lessons learned, not just theoretical knowledge
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <Briefcase className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-3">Flexible Engagement</h3>
              <p className="text-gray-600">
                One-time consultations to ongoing advisory—whatever fits your project needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Sample Questions Our Experts Answer</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
              <p className="text-gray-700">
                "How do we optimize our piping fabrication shop layout to increase throughput by
                30%?"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
              <p className="text-gray-700">
                "What's the best welding procedure for duplex stainless steel in our current
                project?"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
              <p className="text-gray-700">
                "How can we reduce material costs on a large-scale fabrication project without
                compromising quality?"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
              <p className="text-gray-700">
                "What are the critical factors we should consider when bidding for our first major
                EPC project?"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
              <p className="text-gray-700">
                "How do we implement an effective QA/QC system for a multi-million dollar
                fabrication contract?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Have a Technical Challenge?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Connect with our senior advisory panel to get expert guidance tailored to your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Ask an Expert <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
