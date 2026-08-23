import "styles/globals.css"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
export function App() {
  return (
    <div className="h-screen w-screen flex justify-center item-center">
      <div>
        <input placeholder="Linkedin URL" className="p-4" />
        <input placeholder="Github URL" className="p-4" />
        <div className="flex justify-center p-4">
          <button>Start Interview</button>
        </div>
      </div>
    </div>
  );
}

export default App;
