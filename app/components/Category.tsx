import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score, ...props }: CategoryProps) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="flex flex-row items-center justify-center p-4 gap-4">
      <div className="flex flex-row gap-2 items-center bg-gray-50 rounded-2xl p-4 w-full justify-between">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

export default Category;
