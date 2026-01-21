import { inputFields } from "../../constants";
import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const upload = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");
    console.log(file, companyName, jobDescription, jobTitle);
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
