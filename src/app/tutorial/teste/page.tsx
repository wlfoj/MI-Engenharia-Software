import FileUploader  from "@/components/Upload";


export default function Home() {
  return (
    <main className="flex items-center justify-center w-screen h-screen">

        <h1>File uploader</h1>
        <form>
          <div>
            <h3>Thumbnail</h3>
            <FileUploader />
          </div>
        </form>
    </main>
  );
}