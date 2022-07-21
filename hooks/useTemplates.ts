import { useEffect, useState } from "react";

export default function useTemplates() {
  const [foundTemplates, setFoundTemplates] = useState<any[]>([]);

  useEffect(() => {
    try {
      const templates = JSON.parse(localStorage.getItem("templates") || "");
      if (templates) return setFoundTemplates(templates);
    } catch (e) {
      console.error(`Error parsing localStorage ${e}`);
    }
  }, []);

  return foundTemplates;
}
