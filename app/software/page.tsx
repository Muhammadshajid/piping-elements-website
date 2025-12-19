export default function SoftwarePage() {
  return (
    <>
      <section className="py-24 bg-[var(--primary-blue)] text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold">
            GCC-Authorized Software Solutions
          </h1>
          <p className="mt-4 max-w-2xl">
            From drawing to dispatch—digitize your fabrication workflow.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
       <h1 className="text-4xl font-bold">Comimg soon..</h1> 
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            [""],
            
          ].map(([title, desc]) => (
            <div key={title} className="bg-gray-50 p-6 rounded-xl text-center">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-gray-600 mt-2">{desc}</p>
            </div> 
           
          ))}
        </div> 
      </section>
    </>
  );
}
