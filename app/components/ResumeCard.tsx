import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
  feedback,
  id,
  imagePath,
  resumePath,
  companyName,
  jobTitle,
  ...props
}: Resume) => {
  return (
    <Link
      to={`/resume/${id}`}
      className="flex flex-col gap-8 bg-white rounded-2xl p-4 animate-in fade-in duration-100"
      {...props}
    >
      <div className="flex flex-row gap-2 justify-between max-sm:flex-col items-center max-md:justify-center max-md:items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-bold wrap-break-word">
            {companyName}
          </h2>
          <h3 className="text-lg wrap-break-word text-gray-500">{jobTitle}</h3>
        </div>
        <div className="shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-100">
        <div className="w-full h-full">
            <img src={imagePath} alt="resume" className="w-full h-87.5 max-sm:h-50 object-cover object-top" />
        </div>
        
      </div>
    </Link>
  );
};

export default ResumeCard;
