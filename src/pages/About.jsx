import { Award, Users, Clock, Heart } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Clock,
      title: 'Years of Experience',
      description: 'Serving the community for over 25 years with dedication and trust',
    },
    {
      icon: Award,
      title: 'Quality Products',
      description: 'We source only the best quality items for our customers',
    },
    {
      icon: Users,
      title: 'Local Service',
      description: 'A family-owned business that understands your needs',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Gupta Store
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        {/* Main Story */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Gupta General Store & Hardware Shop has been a trusted name in
                our community for over 25 years. What started as a small family
                business has grown into a one-stop destination for all your
                grocery and hardware needs.
              </p>
              <p>
                We take pride in offering quality products at competitive
                prices, combined with personalized service that you won't find
                in larger chain stores. Our friendly staff knows our regular
                customers by name and is always ready to help you find exactly
                what you're looking for.
              </p>
              <p>
                Whether you need daily groceries, household essentials, or
                hardware items for your home improvement projects, we've got you
                covered. We understand the importance of convenience and
                reliability, which is why we maintain a well-stocked inventory
                of both general store items and hardware supplies.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="space-y-4 text-lg text-primary-100">
              <p>
                <strong className="text-white">Trust:</strong> We've built our
                reputation on honesty and reliability. When you shop with us,
                you can trust that you're getting quality products at fair
                prices.
              </p>
              <p>
                <strong className="text-white">Quality:</strong> We carefully
                select our products to ensure they meet our high standards. We
                believe in offering value, not just low prices.
              </p>
              <p>
                <strong className="text-white">Local Service:</strong> As a
                local business, we understand our community's needs. We're here
                to serve you, not just sell to you.
              </p>
            </div>
          </div>
        </div>

        {/* Visit Us CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Visit Us Today
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Experience the difference of shopping at a local store that cares
            about you
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  )
}

export default About

