import vinyles from "../data/vinyles.json";

export default function Tags({ selectedTag, onSelectTag }) {
  // On "aplatit" les tags de tous les vinyles et on supprime les doublons
  const allTags = [...new Set(vinyles.flatMap(v => v.tags))];

  return (
    <div className="flex justify-center gap-2 flex-wrap mb-6">
      {allTags.map((tag, index) => (
        <span
          key={index}
          onClick={() => onSelectTag?.(tag)}
          className={`cursor-pointer select-none bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm border ${
            selectedTag === tag ? 'ring-2 ring-zinc-400 border-zinc-400' : 'border-transparent'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}