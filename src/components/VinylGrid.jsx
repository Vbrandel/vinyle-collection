import VinylCard from "./VinylCard";
import vinyles from "../data/vinyles.json";
import { useEffect, useMemo, useRef, useState } from "react";

export default function VinylGrid({ sortOption = "title-asc", selectedTag = null }) {
  const BATCH_SIZE = 24;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef(null);

  const filteredVinyles = useMemo(() => {
    if (!selectedTag) return vinyles;
    return vinyles.filter(v => Array.isArray(v.tags) && v.tags.includes(selectedTag));
  }, [selectedTag]);

  const sortedVinyles = useMemo(() => {
    const arr = [...filteredVinyles];
    switch (sortOption) {
      case "title-desc":
        return arr.sort((a, b) => b.title.localeCompare(a.title));
      case "artist-asc":
        return arr.sort((a, b) => a.artist.localeCompare(b.artist));
      case "year-desc":
        return arr.sort((a, b) => (b.year || 0) - (a.year || 0));
      case "love-first":
        return arr.sort((a, b) => (b.love === true) - (a.love === true));
      case "title-asc":
      default:
        return arr.sort((a, b) => a.title.localeCompare(b.title));
    }
  }, [sortOption, filteredVinyles]);

  const visibleVinyles = useMemo(
    () => sortedVinyles.slice(0, visibleCount),
    [sortedVinyles, visibleCount]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, sortedVinyles.length));
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sortedVinyles.length]);

  // Réinitialise la pagination quand on change le tri
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [sortOption, selectedTag]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-0 sm:p-6">
        {visibleVinyles.map((vinyle, index) => (
          <VinylCard
            key={index}
            title={vinyle.title}
            artist={vinyle.artist}
            year={vinyle.year}
            image={vinyle.image}
            tags={vinyle.tags}
            love={vinyle.love}
          />
        ))}
      </div>
      {visibleCount < sortedVinyles.length && (
        <div ref={sentinelRef} className="h-10" />
      )}
    </>
  );
}
