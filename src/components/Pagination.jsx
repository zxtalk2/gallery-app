const Pagination = ({ currentPage, totalPages, onNext, onPrev, loading }) => {
    if (!totalPages) return null;

    return (
        <div className="flex items-center justify-center gap-4 py-8 animate-fade-in">
            <button
                onClick={onPrev}
                disabled={currentPage <= 1 || loading}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white font-medium transition-all duration-200 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 active:scale-95"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
            </button>

            <div className="flex flex-col items-center px-4">
                <span className="text-2xl font-bold text-white">{currentPage}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">of {totalPages}</span>
            </div>

            <button
                onClick={onNext}
                disabled={loading || currentPage >= totalPages}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white font-medium transition-all duration-200 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 active:scale-95"
            >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
