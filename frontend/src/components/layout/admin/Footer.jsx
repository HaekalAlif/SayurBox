import React from "react";

const AdminFooter = () => {
  return (
    <footer className="text-gray-800" style={{ backgroundColor: "#D1E8DD" }}>
      <div className="container py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/assets/header/sayurbox-logo.png"
            alt="Sayurbox Logo"
            className="h-8 w-auto"
          />
          <span className="font-bold text-green-700">Sayurbox Admin</span>
        </div>
        <div className="text-sm text-gray-600 mt-3 md:mt-0">
          &copy; {new Date().getFullYear()} Sayurbox Admin Panel. All rights
          reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://facebook.com/sayurbox"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/footer/facebook.png"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://instagram.com/sayurbox"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/footer/instagram.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://x.com/sayurbox"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/footer/twitter.png"
              alt="Twitter"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
