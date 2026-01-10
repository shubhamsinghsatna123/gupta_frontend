import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'

const Contact = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Get in touch with us!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full p-3">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">
                  Bihari chowk vill post Atra , Satna , (M.P) - 485446
                    <br />
                    India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full p-3">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                  <a
                    href="tel:+911234567890"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    +91 9752188131
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full p-3">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <a
                    href="mailto:utkarshg289@gmail.com"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    utkarshg289@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-3">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/919752188131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat with us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Store Hours</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span>8:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Find Us on Map
          </h2>
          <div className="rounded-lg overflow-hidden h-96 border border-gray-200">
            <iframe
              src="https://www.google.com/maps?q=Himanshu+hardware+and+electrical+house,+Atra,+Satna,+Madhya+Pradesh+485446&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gupta Store Location - Himanshu Supermall"
            ></iframe>
            <div className="mt-4 text-center">
              <a
                href="https://www.google.com/maps/place/Himanshu+hardware+and+electrical+house,+Atra,+Satna,+Madhya+Pradesh+485446/data=!4m2!3m1!1s0x39838751b2a57bed:0x4ec6c3cce95afc8e?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjQ5LjYYACCIJyqHASw5NDI2NzcyNyw5NDI3NTQwNyw5NDI5MjE5NSw5NDI5OTUzMiw5NDI4NDQ4MSw5NDI4MDU3Niw5NDIwNzM5NCw5NDIwNzUwNiw5NDIwODUwNiw5NDIxODY1Myw5NDIyOTgzOSw5NDI4MDgyNyw5NDI3NTE2OCw5NDI3OTYxOSw5NDI5NTUwOEICSU4%3D&skid=cfd6a9a7-cfe3-4866-bb0e-21956f86ec90"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

