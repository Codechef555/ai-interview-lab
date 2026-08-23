import "styles/globals.css"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Form } from "./components/Form";
import { useState } from "react";
import { Interview } from "./components/Interview";
import { Result } from "./components/Result";
import { Toaster } from "sonner";
export function App() {
  const [page, setPage] = useState<"form" | "interview" | "result">("form");
  return (
    <div>
      {page == "form" && <Form />}
      {page == "interview" && <Interview />}
      {page == "result" && <Result />}
      <Toaster position="bottom-left" />
    </div>

  );
}

export default App;
