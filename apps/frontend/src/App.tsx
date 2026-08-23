import "styles/globals.css"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
export function App() {
  return (
    <div className="h-screen w-screen flex justify-center item-center">
      <div>
        <input />
        <input />
        <button>Start Interview</button>
      </div>
    </div>
  );
}

export default App;
