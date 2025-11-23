import axios from "axios";
import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const App = () => {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [index, setIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getData = async (page = 1) => {
    if (!inputValue.trim()) {
      setError("Please enter a search keyword to explore.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=28&query=${encodeURIComponent(
          inputValue
        )}&client_id=${accessKey}`
      );

      const tp = response.data.total_pages;
      setTotalPages(tp);

      setImages(response.data.results);
      setIndex(page);

      if (response.data.results.length === 0) {
        if (page > 1) {
          setError("No more images on this page.");
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setTotalPages(null);
    getData(1);
  };

  const handleNext = () => {
    if (totalPages !== null && index >= totalPages) return;
    getData(index + 1);
  };

  const handlePrev = () => {
    if (index <= 1) return;
    getData(index - 1);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">

        {/* Header Section */}
        <header className={`pt-16 pb-12 text-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-6 tracking-tight">
            Visual Discovery
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore a universe of high-resolution images from Unsplash.
            Curated for creators, designed for inspiration.
          </p>

          <SearchBar
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearch={handleSearch}
          />
        </header>

        {/* Error Message */}
        {error && (
          <div className="mx-auto mb-8 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 animate-fade-in">
            {error}
          </div>
        )}

        {/* Gallery Grid */}
        <main className="flex-1">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10 animate-fade-in-up">
              {images.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          ) : (
            !loading && !error && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium">Start your search to begin</p>
              </div>
            )
          )}
        </main>

        {/* Pagination */}
        <Pagination
          currentPage={index}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
          loading={loading}
        />

        {/* Footer */}
        <footer className="py-8 mt-auto border-t border-white/5 text-center">
          <p className="text-gray-500">
            Designed & Built by <span className="text-emerald-400 font-semibold">ZX</span>
          </p>
        </footer>
      </div>

      {/* Loading Overlay */}
      {loading && <Loader />}
    </div>
  );
};

export default App;
