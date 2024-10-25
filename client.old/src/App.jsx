import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/hello");
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setMsg(json.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center pt-40">
      <h1 className="mb-5 text-8xl">Vite + React</h1>
      <div className="text-3xl mb-20">
        <button>Message is {msg}</button>
      </div>
    </div>
  );
}

export default App;
