import FileUploader from "@/components/FileUploader";

export default function Home() {
  return (
    <div>
      <section className="flex min-h-screen">
        <div className="w-[30vw] p-4 flex justify-center items-center bg-[#075e52]">
          <FileUploader />
        </div>
        <div className="w-[70vw] border-l-2">chat section</div>
      </section>
    </div>
  );
}
