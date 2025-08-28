import { Briefcase } from "lucide-react";
import RecordCard from "./RecordCard";
import { useEffect, useState } from "react";

interface Experience {
  company: string;
  period: string;
  description: string;
}
export default function ExperienceCard() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "",
      period: "",
      description: "",
    },
  ]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("employee");
      if (stored) {
        const employee = JSON.parse(stored);
        const filteredExperiences = employee.experiences.map((exp: any) => ({
          company: exp.company,
          period: exp.period, 
          description: exp.description,
        }));

        setExperiences(filteredExperiences);
      }
    } catch (err) {
      console.error("Failed to parse employee from localStorage", err);
    }
  }, []);
  return (
    <RecordCard
      title="Experience"
      logo={<Briefcase className="w-4 h-4 text-theme" />}
      records={experiences}
      setRecords={setExperiences}
    />
  );
}
