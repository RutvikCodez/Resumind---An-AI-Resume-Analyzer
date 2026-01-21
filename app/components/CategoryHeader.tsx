import DetailsScoreBadge from "./DetailsScoreBadge";

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <DetailsScoreBadge score={categoryScore} />
    </div>
  );
};

export default CategoryHeader;
