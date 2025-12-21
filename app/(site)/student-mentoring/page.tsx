import Link from 'next/link';
import { GraduationCap, Users, Briefcase, BookOpen, Target, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function StudentMentoringPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              Mentoring & Empowering Future Oil & Gas Professionals
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Bridging the gap between academic knowledge and industry requirements. We guide
              aspiring professionals to build successful careers in the oil & gas sector.
            </p>
            <Link href="/contact"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Join Our Mentoring Program
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gray-900 mb-6">
                Building the Next Generation of Oil & Gas Professionals
              </h2>
              <p className="text-gray-600 mb-4">
                The oil & gas industry demands highly skilled professionals with both technical
                expertise and practical industry knowledge. However, fresh graduates often face
                challenges in transitioning from academic learning to real-world project execution.
              </p>
              <p className="text-gray-600 mb-4">
                At Piping Elements, we bridge this gap through comprehensive mentoring programs
                designed to empower students and early-career professionals. Our experienced
                industry experts provide guidance, share knowledge, and help build the skills
                necessary for successful careers in EPC, engineering, and supply chain management.
              </p>
              <p className="text-gray-600">
                Whether you're a student preparing to enter the industry or a young professional
                looking to accelerate your career growth, our mentoring programs provide the
                support and knowledge you need to succeed.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Students learning"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Our Mentoring Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guidance tailored to your career stage and goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Career Guidance */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-4">Career Guidance & Planning</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Career path exploration in oil & gas sector</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Resume building and interview preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Industry networking strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Job search and placement support</span>
                </li>
              </ul>
            </div>

            {/* Technical Training */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-4">Technical Skills Development</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Piping engineering fundamentals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Industry codes and standards (ASME, API)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>CAD software and engineering tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Project documentation best practices</span>
                </li>
              </ul>
            </div>

            {/* Industry Insights */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-4">Industry Insights & Exposure</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Understanding EPC project workflows</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Real-world case studies and scenarios</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Supply chain and procurement processes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Quality assurance and safety practices</span>
                </li>
              </ul>
            </div>

            {/* One-on-One Mentoring */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-4">One-on-One Mentoring</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Personalized guidance from industry experts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Regular progress tracking and feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom learning plans based on goals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Professional development roadmap</span>
                </li>
              </ul>
            </div>

            {/* Skill Certifications */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-4">Certification Preparation</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Guidance for professional certifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Study materials and resources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Practice tests and mock interviews</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Industry-recognized credentials guidance</span>
                </li>
              </ul>
            </div>

            {/* Workshops & Webinars */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-4">Workshops & Webinars</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Regular interactive training sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Guest lectures from industry leaders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Hands-on project exercises</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Q&A sessions with experts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Benefit */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Who Can Benefit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our mentoring programs are designed for various stages of your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Engineering Students</h3>
              <p className="text-gray-600">
                Preparing to enter the oil & gas industry with strong foundational knowledge
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Fresh Graduates</h3>
              <p className="text-gray-600">
                Looking to launch their careers and gain practical industry insights
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Early Career Professionals</h3>
              <p className="text-gray-600">
                Seeking to enhance skills and accelerate career progression
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Career Switchers</h3>
              <p className="text-gray-600">
                Transitioning into oil & gas from other industries or disciplines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Why Choose Piping Elements for Mentoring</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Learn from experienced professionals with decades of industry experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="text-white mb-3">Industry Expertise</h3>
              <p className="text-blue-100">
                Our mentors have extensive experience in EPC projects, engineering consultancy, and
                supply chain management across global projects.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="text-white mb-3">Practical Knowledge</h3>
              <p className="text-blue-100">
                Learn real-world skills and best practices that are immediately applicable in your
                career, not just theoretical concepts.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="text-white mb-3">Personalized Approach</h3>
              <p className="text-blue-100">
                Every mentoring program is customized to your specific goals, background, and career
                aspirations.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="text-white mb-3">Industry Network</h3>
              <p className="text-blue-100">
                Gain access to our extensive network of professionals, companies, and opportunities
                in the oil & gas sector.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="text-white mb-3">Flexible Learning</h3>
              <p className="text-blue-100">
                Programs designed to fit your schedule with online sessions, workshops, and
                one-on-one consultations.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="text-white mb-3">Ongoing Support</h3>
              <p className="text-blue-100">
                Continuous guidance throughout your career journey, not just a one-time training
                program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals we've helped launch their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "The mentoring program helped me transition from academic learning to practical
                engineering. Within 6 months, I secured a position as a piping engineer at a major
                EPC contractor."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  R
                </div>
                <div className="ml-4">
                  <p className="text-gray-900">Rahul Sharma</p>
                  <p className="text-gray-500 text-sm">Piping Engineer, Dubai</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "The one-on-one mentoring sessions were invaluable. My mentor's guidance on
                industry standards and best practices gave me confidence in my first project role."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  S
                </div>
                <div className="ml-4">
                  <p className="text-gray-900">Sarah Ahmed</p>
                  <p className="text-gray-500 text-sm">Design Engineer, Abu Dhabi</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "As a fresh graduate, I was overwhelmed by the complexity of real projects. The
                mentoring program bridged the gap and accelerated my learning curve significantly."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  M
                </div>
                <div className="ml-4">
                  <p className="text-gray-900">Mohammed Al-Harthi</p>
                  <p className="text-gray-500 text-sm">QC Engineer, Oman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gray-900 mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our mentoring program and gain the knowledge, skills, and confidence to succeed in
            the oil & gas industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/about"
              className="px-8 py-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
