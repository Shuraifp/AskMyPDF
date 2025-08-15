import ChatBox from "@/components/ChatBox";
import ChatInput from "@/components/ChatInput";
import FileUploader from "@/components/FileUploader";

export default function Home() {
  return (
    <div className="h-screen">
      <section className="flex h-full">
        <div className="w-[30vw] p-4 flex justify-center items-center bg-[#075e52]">
          <FileUploader />
        </div>
        <div className="w-[70vw] border-l-2 bg-[#0b5166] flex flex-col p-3">
          <div className="p-4 pb-0 text-white flex-shrink-0">
            <div className="flex flex-col gap-2 border-b-2 pb-3 border-b-[#106980]">
              <h1 className="text-2xl font-bold">Chat with your PDF</h1>
              <p className="text-sm">
                You can ask questions about the content of the PDF, and the AI
                will respond based on the text in the document.
              </p>
            </div>
          </div>

          <div className="chat-box flex-1 px-10 py-8 overflow-y-auto">
            <ChatBox />
          </div>

          <div className="flex-shrink-0">
            <ChatInput classNameProp="h-22 pt-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
