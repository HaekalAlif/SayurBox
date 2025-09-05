import React, { useState } from "react";
import { ChevronLeft, Search, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingRecipe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const categoryItems = [
    {
      title: "Sayur",
      image: "assets/recipe/sayur.png",
      bgColor: "#B1E9AB",
      path: "/vegetable-recipe",
    },
    {
      title: "Seafood",
      image: "assets/recipe/seafood.png",
      bgColor: "#CBEAE2",
      path: "/seafood-recipe",
    },
    {
      title: "Sapi",
      image: "assets/recipe/sapi.png",
      bgColor: "#FFE887",
      path: "/beef-recipe",
    },
    {
      title: "Ayam",
      image: "assets/recipe/ayam.png",
      bgColor: "#FFC7C5",
      path: "/chicken-meat-recipe",
    },
  ];

  const recipeItems = [
    {
      image: "assets/recipe/sayur-asem.png",
      title: "Sayur Asem",
      path: "/recipe/detail",
    },
  ];

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-12 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="">
        <div className="max-w-5xl mx-auto space-y-8 ">
          <div className="text-2xl font-bold">
            <h1>RASA - Resep Andalan SayurBox </h1>
          </div>
          <div className="bg-[#F6F2E8] rounded-sm px-20">
            <div className="flex items-center justify-between">
              <img
                src="assets/recipe/rasa.png"
                className="w-42 h-42 object-contain rounded-lg ml-2"
              />
              <div className="w-[72%] mr-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari Resep yang diinginkan"
                    className="w-full h-10 px-6 py-3 pr-12 bg-white border-2 focus:outline-none focus:border-green-400 transition-colors rounded-sm "
                    style={{ borderColor: "#BEE4B4" }}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full">
                    <img src="assets/header/search.png" className="w-8" />
                  </button>
                </div>
              </div>
            </div>

            {/* Kategori Resep */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold ">Kategori Resep</h2>
              <div className="grid grid-cols-2 gap-x-20 gap-y-12">
                {categoryItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg pl-14 h-32 cursor-pointer hover:shadow-md transition-shadow duration-200 justify-between"
                    style={{ backgroundColor: item.bgColor }}
                    onClick={() => navigate(item.path)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center py-6 ">
                        <div>
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                        </div>
                      </div>
                      <div className="w-40 h-32 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rekomendasi Resep Hari Ini */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 pb-12 pt-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white border-2 rounded-lg shadow-md overflow-hidden hover:border-green-600 transition-shadow duration-200 cursor-pointer "
                  onClick={() => navigate(recipeItems[0].path)}
                >
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={recipeItems[0].image}
                      alt={recipeItems[0].title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="mx-auto p-4 text-center">
                    <h3 className="text-md font-semibold text-gray-900">
                      {recipeItems[0].title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="rounded-lg py-8 px-62 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          RASA - Resep dan Menu Andalan Sayurbox
        </h3>
        <div className="space-y-2">
          <p className="text-md font-medium">
            Kumpulan Resep Menu Sehat dan Praktis dari Sayurbox untuk Keluarga.
          </p>
          <p>
            {!isExpanded && (
              <span className="text-gray-700">
                Mencari variasi menu sehat untuk keluarga kini lebih mudah!{" "}
                Dengan kumpulan resep andalan dari Sayurbox. Dengan bahan-bahan
                segar dan berkualitas tinggi, Sayurfriends bisa menyajikan
                hidangan lezat yang praktis,
              </span>
            )}
            {isExpanded && (
              <div className="space-y-4">
                <p>
                  Mencari variasi menu sehat untuk keluarga kini lebih mudah!
                  Dengan kumpulan resep andalan dari Sayurbox. Dengan
                  bahan-bahan segar dan berkualitas tinggi, Sayurfriends bisa
                  menyajikan hidangan lezat yang praktis, mulai dari resep
                  daging ayam, menu sayuran segar, hingga olahan seafood favorit
                  keluarga.
                </p>

                <p className="text-md font-medium">
                  Resep Sehat untuk Hidangan Keluarga
                </p>
                <p>
                  Setiap resep dalam koleksi ini dirancang untuk memberikan rasa
                  autentik dan mudah dibuat di rumah. Dengan bahan-bahan seperti
                  daging ayam kaya protein, sayuran yang kaya serat, hingga
                  seafood yang penuh nutrisi, resep ini dirancang untuk memenuhi
                  kebutuhan nutrisi harian keluarga.
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    {" "}
                    Daging Ayam : Pilihan menu ayam yang kaya rasa dan mudah
                  </li>
                  <li>
                    {" "}
                    Seafood Segar : Resep praktis dengan bahan-bahan laut
                    berkualitas tinggi.
                  </li>
                  <li>
                    {" "}
                    Sayuran Sehat : Hidangan segar seperti resep sayur asem yang
                    memberikan nutrisi penting bagi tubuh
                  </li>
                </ul>
                <p>
                  Sayur asem menjadi salah satu hidangan yang digemari banyak
                  keluarga Indonesia. Dengan bahan-bahan segar dari Sayurbox,
                  Sayurfriends bisa membuat resep sayur asem sederhana dan lezat
                  di rumah. Sayur asem tidak hanya enak, tetapi juga kaya akan
                  serat, vitamin, dan mineral yang baik untuk tubuh.
                </p>
                <p className="text-md font-medium">
                  #Kenapa Memilih Resep dari Sayurbox?
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    {" "}
                    Bahan Berkualitas Tinggi: Semua bahan berasal dari produk
                    segar Sayurbox untuk cita rasa terbaik.
                  </li>
                  <li>
                    {" "}
                    Gizi Seimbang: Cocok untuk menu sehari-hari yang sehat dan
                    bergizi, termasuk resep sayur asem sehat.
                  </li>
                  <li> Praktis: Resep mudah diikuti bahkan untuk pemula.</li>
                </ul>
                <p>
                  #Pilihan Resep yang Variatif Kumpulan resep ini mencakup menu
                  lengkap untuk keluarga, mulai dari makanan berat, sayur segar,
                  hingga camilan sehat yang nikmat. Pilih resep yang sesuai
                  dengan kebutuhan harian, untuk makan siang, makan malam, atau
                  bekal keluarga.
                </p>
                <p className="text-md font-medium">
                  Berikut adalah kategori resep sehat yang bisa Anda eksplorasi
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    {" "}
                    lebih lanjut: Resep Sayur Sehat (termasuk resep sayur asem)
                  </li>
                  <li> Resep Daging Ayam</li>
                  <li> Resep Daging Sapi</li>
                  <li> Resep Ikan dan Seafood</li>
                </ul>
                <p className="text-md font-medium">
                  #Masak Lebih Mudah dengan Sayurbox
                </p>
                <p>
                  Bagi Sayurfriends yang ingin memberikan yang terbaik untuk
                  keluarga, kumpulan resep ini adalah solusi sempurna. Dengan
                  langkah memasak yang sederhana dan bahan berkualitas, kini
                  menyiapkan menu sehat setiap hari, termasuk resep sayur asem,
                  menjadi lebih mudah dan bergizi.
                </p>
                <p className="text-md font-medium">
                  Yuk, coba kumpulan resep dari Sayurbox sekarang! Nikmati
                  pengalaman memasak menyenangkan dengan hasil yang memuaskan
                  untuk seluruh keluarga.
                </p>
              </div>
            )}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-green-800 hover:text-green-700 font-bold cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>View Less</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>View More</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingRecipe;
