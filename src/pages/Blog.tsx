import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Optimizing Supply Chain for EPC Projects in GCC',
    excerpt:
      'Learn how to streamline procurement processes and reduce costs in large-scale energy projects across the GCC region.',
    category: 'Supply Chain',
    date: 'November 15, 2024',
    author: 'Ahmed Al-Mazrouei',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MjcxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'The Future of Piping Fabrication Software',
    excerpt:
      'Discover how digital solutions are transforming fabrication workflows and improving productivity across the industry.',
    category: 'Digital Transformation',
    date: 'November 10, 2024',
    author: 'Sarah Williams',
    image:
      'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGlwaW5nJTIwc3RlZWwlMjBmYWJyaWNhdGlvbnxlbnwxfHx8fDE3NjQzMjIxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '6 min read',
  },
  {
    id: 3,
    title: 'Why Senior Advisory Matters in Complex Projects',
    excerpt:
      'Understanding the value of experienced engineering consultants in risk mitigation and technical problem-solving.',
    category: 'Advisory',
    date: 'November 5, 2024',
    author: 'Dr. Rajesh Kumar',
    image:
      'https://images.unsplash.com/photo-1573165067541-4cd6d9837902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbnN1bHRhbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzY0MzIyMTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '10 min read',
  },
  {
    id: 4,
    title: 'Best Practices for Piping Design Review',
    excerpt:
      'Key checkpoints and common pitfalls to avoid during piping design review in oil & gas projects.',
    category: 'Engineering',
    date: 'October 28, 2024',
    author: 'Mohammed Al-Harthi',
    image:
      'https://images.unsplash.com/photo-1749549437525-3b5aa46fa1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBnYXMlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NjQyNjEzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '12 min read',
  },
  {
    id: 5,
    title: 'QA/QC Essentials for Fabrication Shops',
    excerpt:
      'Essential quality assurance practices every fabrication shop should implement to meet project specifications.',
    category: 'Engineering',
    date: 'October 20, 2024',
    author: 'Sarah Williams',
    image:
      'https://images.unsplash.com/photo-1487491424367-7571f9afbb30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NDMxMDYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '9 min read',
  },
  {
    id: 6,
    title: 'Vendor Management Strategies for EPC Contractors',
    excerpt:
      'How to build and maintain effective vendor relationships for successful project procurement.',
    category: 'Supply Chain',
    date: 'October 15, 2024',
    author: 'Ahmed Al-Mazrouei',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MjcxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '7 min read',
  },
  {
    id: 7,
    title: 'Digital Transformation in Piping Fabrication',
    excerpt:
      'A step-by-step guide to implementing digital solutions in traditional fabrication environments.',
    category: 'Digital Transformation',
    date: 'October 8, 2024',
    author: 'Dr. Rajesh Kumar',
    image:
      'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGlwaW5nJTIwc3RlZWwlMjBmYWJyaWNhdGlvbnxlbnwxfHx8fDE3NjQzMjIxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '11 min read',
  },
  {
    id: 8,
    title: 'Understanding Welding Procedure Specifications',
    excerpt:
      'A comprehensive guide to developing and qualifying welding procedures for critical applications.',
    category: 'Engineering',
    date: 'October 1, 2024',
    author: 'Mohammed Al-Harthi',
    image:
      'https://images.unsplash.com/photo-1487491424367-7571f9afbb30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NDMxMDYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '15 min read',
  },
  {
    id: 9,
    title: 'Cost Control Strategies for Large-Scale Projects',
    excerpt:
      'Proven techniques for managing budgets and controlling costs in multi-million dollar EPC projects.',
    category: 'Advisory',
    date: 'September 25, 2024',
    author: 'Ahmed Al-Mazrouei',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MjcxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '10 min read',
  },
];

const categories = ['All', 'Supply Chain', 'Engineering', 'Advisory', 'Digital Transformation'];

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">Insights & Knowledge from Industry Experts</h1>
            <p className="text-xl text-blue-100">
              Expert perspectives on engineering, supply chain, and digital transformation in the
              EPC and fabrication sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">{post.author}</p>
                        <p className="text-gray-500">{post.date}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination (placeholder) */}
          {filteredPosts.length > 0 && (
            <div className="mt-12 flex justify-center gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                3
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest insights and industry updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
