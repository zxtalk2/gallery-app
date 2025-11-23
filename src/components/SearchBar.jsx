const SearchBar = ({ value, onChange, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="relative max-w-2xl w-full mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                className="block w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 shadow-xl transition-all duration-300"
                type="text"
                placeholder="Search high-resolution images..."
            />
            <button
                onClick={onSearch}
                className="absolute right-2 top-2 bottom-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 rounded-xl font-medium transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/30"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
