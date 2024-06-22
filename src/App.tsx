import { FooterSection } from "./FooterSection";
import { HeaderSection } from "./HeaderSection";
import { PayloadManager } from "./PayloadManager";

function App() {
  return (
    <div className="p-8 min-h-screen flex items-stretch">
      <div className="max-w-3xl mx-auto min-h-full flex flex-col gap-8">
        {/* Header */}
        <HeaderSection />

        {/* "Payload Manager" (actual app) */}
        <main className="flex-grow">
          <PayloadManager />
        </main>

        <FooterSection />
      </div>
    </div>
  );
}

export default App;
