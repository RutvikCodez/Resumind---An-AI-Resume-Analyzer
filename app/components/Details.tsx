import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import CategoryHeader from "./CategoryHeader";
import CategoryContent from "./CategoryContent";

const Details = ({ feedback }: { feedback: Feedbackb }) => {
  const categories = [
    { id: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
    { id: "content", title: "Content", data: feedback.content },
    { id: "structure", title: "Structure", data: feedback.structure },
    { id: "skills", title: "Skills", data: feedback.skills },
  ];
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        {categories.map(({ id, title, data }) => (
          <AccordionItem key={id} id={id}>
            <AccordionHeader itemId={id}>
              <CategoryHeader title={title} categoryScore={data.score} />
            </AccordionHeader>
            <AccordionContent itemId={id}>
              <CategoryContent tips={data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
