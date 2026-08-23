import "styles/globals.css"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
export function App() {
  return (
    <div className="h-screen w-screen flex justify-center item-center">
      <div>
        <div className="p-4">
          <input placeholder="Linkedin URL" />
        </div>
        <div className="p-4">
          <input placeholder="Github URL" />
        </div>
        <div className="flex justify-center p-4">
          <Button>Start Interview</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
