import Category from "./Category";
import ScoreCircle from "./ScoreCircle";

const Summary = ({ feedback }: { feedback: Feedbackb }) => {
  const categories = [
    { title: "Tone & Style", score: feedback.toneAndStyle.score },
    { title: "Content", score: feedback.content.score },
    { title: "Structure", score: feedback.structure.score },
    { title: "Skills", score: feedback.skills.score },
  ];
  return (
    <div className=" bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreCircle score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>
      {categories.map((category, index) => (
        <Category key={index} {...category} />
      ))}
    </div>
  );
};

export default Summary;
