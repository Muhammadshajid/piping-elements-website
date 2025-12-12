export default function ContactPage() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* HEADING */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Connect With Us
          </h1>
          <p className="text-gray-600 mt-3">
            Reach out to our experts for consultancy, procurement, or software solutions
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* CONTACT FORM */}
          <form className="bg-white p-8 rounded-xl shadow-sm space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-md px-4 py-3"
            />

            <input
              type="text"
              placeholder="Company Name"
              className="w-full border rounded-md px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-md px-4 py-3"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-md px-4 py-3"
            />

            <select className="w-full border rounded-md px-4 py-3">
              <option>Service Needed</option>
              <option>Supply Chain & Procurement</option>
              <option>Engineering Consultancy</option>
              <option>Senior Expert Advisory</option>
              <option>Software Solutions</option>
            </select>

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full border rounded-md px-4 py-3"
            ></textarea>

            <button className="btn-primary w-full">
              Submit Inquiry
            </button>
          </form>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Office – UAE</h3>
              <p className="text-gray-600 mt-2">
                Dubai, United Arab Emirates
              </p>
              <p className="text-gray-600">info@pipingelements.com</p>
              <p className="text-gray-600">+971 50 123 4567</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm">
              <iframe
                title="UAE Office Map"
                src="https://www.google.com/maps?q=Dubai&output=embed"
                className="w-full h-64 border-0"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
