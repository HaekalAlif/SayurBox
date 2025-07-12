import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🥬</span>
              </div>
              <span className="text-2xl font-serif font-semibold">
                sayurbox
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Platform belanja sayur dan buah segar langsung dari petani lokal.
              Kualitas terbaik dengan harga terjangkau.
            </p>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Kategori */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">Sayuran Segar</li>
              <li className="hover:text-white cursor-pointer">Buah-buahan</li>
              <li className="hover:text-white cursor-pointer">Bumbu Dapur</li>
              <li className="hover:text-white cursor-pointer">Protein</li>
              <li className="hover:text-white cursor-pointer">
                Produk Organik
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">
                Cara Berbelanja
              </li>
              <li className="hover:text-white cursor-pointer">
                Kebijakan Pengiriman
              </li>
              <li className="hover:text-white cursor-pointer">
                Kebijakan Pengembalian
              </li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Hubungi Kami</li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Kontak Kami</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@sayurbox.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  Jl. Raya Serpong No. 123, Tangerang Selatan, Banten 15310
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 SayurBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
