import { Heart } from "lucide-react";
import { useState } from "react";

export default function VinylCard({ title, image, tags, year, artist, love }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
      
      {/* ❤️ icône en haut à droite si love = true */}
      {love && (
        <div className="absolute top-2 right-2 z-20 bg-white rounded-full p-1 shadow-md cursor-pointer group">
          <Heart className="w-5 h-5 text-red-300 fill-red-300" />

          {/* Texte qui apparaît au hover */}
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 
                          bg-black text-white text-xs rounded px-2 py-1 
                          hidden group-hover:block whitespace-nowrap">
            Coup de cœur
          </span>
        </div>
      )}

      <div className="relative w-full h-56 mb-3">
        {/* Placeholder flou */}
        <div
          className={`absolute inset-0 z-0 pointer-events-none bg-gray-200 transition-opacity duration-300 ${
            isImageLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={image}
          alt={title}
          className={`relative z-10 w-full h-56 object-cover transition-all duration-500 ease-out ${
            isImageLoaded ? "blur-0 scale-100" : "blur-sm scale-105"
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 leading-none">{title}</h3>
        <h4 className="text-m text-gray-700 mb-1 leading-none">{artist}</h4>
        <p className="text-gray-500">{year}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
