import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Send } from 'lucide-react';
import { submitContactForm } from '../utils/api';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Call secure backend API
    const result = await submitContactForm(formData);

    if (result.success) {
      console.log('✅ Form submitted successfully:', result.data);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      }, 5000);
    } else {
      console.error('❌ Form submission failed:', result.error);
      // Check if it's a backend deployment issue
      if (result.error?.includes('Failed to fetch') || result.error?.includes('NetworkError')) {
        setError('Backend not deployed yet. This form will work after hosting. See DEVELOPMENT-NOTES.md');
      } else {
        setError(result.error || 'Failed to submit form. Please try again.');
      }
    }

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">Connect With Us</h1>
            <p className="text-xl text-blue-100">
              Ready to discuss your project? Get in touch with our team for expert consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">
                    Thank you for your message! We'll be in touch soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-gray-700 mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service...</option>
                    <option value="supply-chain">Supply Chain & Procurement</option>
                    <option value="engineering">Engineering Consultancy</option>
                    <option value="advisory">Senior Expert Advisory</option>
                    <option value="software">Software Solutions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="mr-2 h-5 w-5" />
                  )}
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:info@pipingelements.com"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      info@pipingelements.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+971501234567" className="text-blue-600 hover:text-blue-700">
                      +971 50 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/971501234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      +971 50 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Linkedin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">LinkedIn</h3>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Connect with us
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-gray-900">UAE Office</h3>
                  </div>
                  <p className="text-gray-600 ml-7">
                    Dubai, United Arab Emirates
                    <br />
                    Serving GCC region
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-gray-900">India Office</h3>
                  </div>
                  <p className="text-gray-600 ml-7">
                    Mumbai, India
                    <br />
                    Global support center
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 6:00 PM GST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 2:00 PM GST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden" style={{ height: '450px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6828597979!2d54.897487!3d25.276987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dubai Office Location"
            />
          </div>
        </div>
      </section>

      {/* Quick Links CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Or Choose Your Service</h2>
            <p className="text-xl text-blue-100">
              Jump directly to the service you're interested in
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <a
              href="/services/supply-chain"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center hover:bg-white/20 transition-colors"
            >
              <h3 className="text-white mb-2">Supply Chain</h3>
              <p className="text-blue-100">Procurement support</p>
            </a>
            <a
              href="/services/engineering-consultancy"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center hover:bg-white/20 transition-colors"
            >
              <h3 className="text-white mb-2">Engineering</h3>
              <p className="text-blue-100">Technical consulting</p>
            </a>
            <a
              href="/services/senior-expert-advisory"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center hover:bg-white/20 transition-colors"
            >
              <h3 className="text-white mb-2">Advisory</h3>
              <p className="text-blue-100">Expert guidance</p>
            </a>
            <a
              href="/software"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center hover:bg-white/20 transition-colors"
            >
              <h3 className="text-white mb-2">Software</h3>
              <p className="text-blue-100">Digital solutions</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}