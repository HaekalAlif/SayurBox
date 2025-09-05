import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-800" style={{ backgroundColor: "#D1E8DD" }}>
      <div className="container py-10 px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Layanan Sayurbox */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Layanan Sayurbox
            </h3>
            <ul className="space-y-6">
              <li>
                <a
                  href="/recipe"
                  className="text-gray-800 font-medium hover:text-green-600 transition-colors cursor-pointer"
                >
                  Resep Sayurbox
                </a>
              </li>
              <li>
                <a
                  href="/sayur-poin"
                  className="text-gray-800 font-medium hover:text-green-600 transition-colors cursor-pointer"
                >
                  SayurPoin
                </a>
              </li>
              <li>
                <a
                  href="/sayur-panen"
                  className="text-gray-800 font-medium hover:text-green-600 transition-colors cursor-pointer"
                >
                  SayurPanen
                </a>
              </li>
              <li>
                <a
                  href="/voucher"
                  className="text-gray-800 font-medium hover:text-green-600 transition-colors cursor-pointer"
                >
                  Voucher Saya
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-800 font-medium hover:text-green-600 transition-colors cursor-pointer"
                >
                  FaQ Sayurbox
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us! */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Follow Us!</h3>
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/footer/facebook.png"
                  alt="Facebook"
                  className="w-6 h-6"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <a
                  href="#"
                  className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                >
                  Facebook
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/footer/instagram.png"
                  alt="Instagram"
                  className="w-6 h-6"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <a
                  href="#"
                  className="text-gray-800 font-medium hover:text-pink-600 transition-colors"
                >
                  Instagram
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/footer/twitter.png"
                  alt="Twitter"
                  className="w-6 h-6"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <a
                  href="#"
                  className="text-gray-800 font-medium hover:text-blue-400 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Get Us! */}
          <div className="flex flex-col items-center text-center">
            {/* Illustration */}
            <div className="mb-6">
              <img
                src="/assets/footer/get-us.png"
                alt="Sayurbox Illustration"
                className="w-100 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-64 h-32 bg-green-100 rounded-lg items-center justify-center hidden">
                <span className="text-4xl">📱🥬</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex space-x-4 w-full max-w-md">
              {/* Google Play Button */}
              <a
                href="#"
                className="flex items-center px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-full"
              >
                <img
                  src="/assets/footer/google-play.png"
                  alt="Google Play"
                  className="w-8 h-8 mr-3"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="text-gray-800 font-medium">Google Play</span>
              </a>

              {/* Web Browser Button */}
              <a
                href="#"
                className="flex items-center px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-full"
              >
                <img
                  src="/assets/footer/chrome.png"
                  alt="Web Browser"
                  className="w-6 h-6 mr-3"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="text-gray-800 font-medium">Web Browser</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
