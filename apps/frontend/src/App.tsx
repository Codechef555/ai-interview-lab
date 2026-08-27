import "styles/globals.css"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Form } from "./components/Form";
import { useState } from "react";
import { Interview } from "./components/Interview";
import { Result } from "./components/Result";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";

export function App() {
  const [page, setPage] = useState<"form" | "interview" | "result">("form");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/interview:id" element={<Form />} />
        <Route path="/" element={<Form />} />
      </Routes>
      {page == "form" && <Form />}
      {page == "interview" && <Interview />}
      {page == "result" && <Result />}
      <Toaster position="bottom-left" />
    </BrowserRouter>

  );
}

export default App;
