import "styles/globals.css"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Form } from "./components/Form";
import { useState } from "react";
import { Interview } from "./components/Interview";
import { Result } from "./components/Result";
export function App() {
  const [page, setPage] = useState<"form" | "interview" | "result">("form");
  return (
    <div>
      {page == "form" && <Form />}
      {page == "interview" && <Interview />}
      {page == "result" && <Result />}
    </div>

  );
}

export default App;
