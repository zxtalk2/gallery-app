import { useState } from "react";

const ImageCard = ({ image }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group overflow-hidden rounded-xl shadow-lg bg-gray-900 aspect-[3/4] w-full max-w-[300px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={image.urls.small}
                alt={image.alt_description || "Unsplash Image"}
                loading="lazy"
            />

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4`}>
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium truncate">
                        {image.user.name}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-300">
                            ❤️ {image.likes}
                        </span>
                        <a
                            href={image.links.download}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Download
                        </a>
                    </div>
                </div>
            </div>

            <a
                href={image.urls.regular}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="View full size image"
            ></a>
        </div>
    );
};

export default ImageCard;
