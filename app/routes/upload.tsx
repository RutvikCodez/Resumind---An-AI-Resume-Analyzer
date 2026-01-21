import { useNavigate } from "react-router";
import { inputFields, prepareInstructions } from "../../constants";
import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdf2Img";
import { generateUUID } from "~/lib/utils";

const upload = () => {
  const { fs, kv, ai } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyze = async ({
    companyName,
    file,
    jobDescription,
    jobTitle,
  }: analyzeResumeType) => {
    setIsProcessing(true);
    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file.");
    setStatusText("Converting to image...");
    const imgFile = await convertPdfToImage(file);
    if (!imgFile.file)
      return setStatusText("Error: Failed to convert PDF to image.");
    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imgFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image.");
    setStatusText("Preparing Data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback) return setStatusText("Error: Failed to analyze resume.");
    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis Complete, redirecting...");
    console.log(data);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col gap-16 pb-5">
      <Navbar />
      <section className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-8 max-w-5xl text-center max-sm:gap-4">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Resume"
                className="w-full"
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              {inputFields.map(({ label, name, placeholder, type, rows }) => (
                <div
                  key={name}
                  className="flex flex-col gap-2 w-full items-start"
                >
                  <label htmlFor={name}>{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      rows={rows}
                      name={name}
                      placeholder={placeholder}
                      id={name}
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      id={name}
                    />
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
