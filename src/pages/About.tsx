import { Target, Eye, Users, Lightbulb, Handshake, Zap } from 'lucide-react';

const teamMembers = [
  {
    name: 'Anvar Sadath',
    title: 'Founder & Senior Consultant',
    specialization: 'Piping & Fabrication',
    image: 'https://images.unsplash.com/photo-1747811853874-c00a51195d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDIzOTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Dr. Rajesh Kumar',
    title: 'Chief Technical Advisor',
    specialization: 'Piping Engineering & Project Management',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    name: 'Ahmed Al-Mazrouei',
    title: 'Senior Advisory - Project Controls',
    specialization: 'Scheduling, Cost Management & Procurement',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Sarah Williams',
    title: 'Lead Advisor - QA/QC',
    specialization: 'Quality Assurance & Welding Engineering',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    name: 'Mohammed Al-Harthi',
    title: 'Structural Engineering Consultant',
    specialization: 'Structural Design & Analysis',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'David Thompson',
    title: 'HSE Advisory Lead',
    specialization: 'Health, Safety & Environmental Management',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: 'Priya Sharma',
    title: 'Supply Chain Director',
    specialization: 'Procurement & Vendor Management',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
];

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              Engineering Expertise Meets Global Supply Chain Intelligence
            </h1>
            <p className="text-xl text-blue-100">
              Knowledge, experience, and innovative solutions for energy and fabrication sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gray-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 mb-4">
                Piping Elements is a trusted partner for EPC, oil & gas, and fabrication companies
                across the GCC. We specialize in supply chain solutions, engineering consultancy,
                senior-level expert advisory, and GCC-authorized software solutions that optimize
                piping fabrication workflows.
              </p>
              <p className="text-gray-600 mb-4">
                We bring together senior-level expertise, end-to-end supply chain solutions, and
                cutting-edge digital tools to help contractors, fabricators, and energy companies
                execute projects with confidence and efficiency.
              </p>
              <p className="text-gray-600 mb-4">
                With offices in the UAE and India, we combine global best practices with local
                market knowledge, offering services that span from procurement and engineering
                consultancy to expert advisory and GCC-authorized software solutions.
              </p>
              <p className="text-gray-600">
                Our team comprises retired EPC managers, PhD-level specialists, and industry
                veterans who have led some of the most complex projects in the energy sector.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1573165067541-4cd6d9837902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbnN1bHRhbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzY0MzIyMTYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Engineering team"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To deliver practical, expert-led solutions that enhance project efficiency and
                knowledge transfer across the industry.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the go-to platform for EPC professionals, contractors, and startups seeking
                senior guidance, supply chain excellence, and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we deliver value to our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Knowledge-Driven</h3>
              <p className="text-gray-600">
                We leverage decades of collective experience from senior EPC professionals to
                provide insights that matter. Our advisory panel has led projects worth billions
                and understands real-world challenges.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Collaborative</h3>
              <p className="text-gray-600">
                We work as an extension of your team, not just as consultants. Our approach is
                hands-on, practical, and tailored to your specific project requirements and
                organizational culture.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Digital-Ready</h3>
              <p className="text-gray-600">
                We embrace technology and innovation. As authorized distributors of leading
                fabrication software, we help you modernize workflows and gain competitive
                advantages through digitalization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team / Advisory Board */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Leadership Team & Advisory Board</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experts behind Piping Elements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-white mb-6">Ready to work with industry experts?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how our team can support your next project.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
