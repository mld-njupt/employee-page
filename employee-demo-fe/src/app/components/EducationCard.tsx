import { useEffect, useState } from "react";
import EditableCard from "./EditableCard";
import EditAndDelCard from "./EditAndDelCard";
import { GraduationCap } from "lucide-react";
import RecordCard from "./RecordCard";

interface Education {
  degree: string;
  institution: string;
  field: string;
}

export default function EducationCard() {
  // 模拟数据，后面可替换成 API fetch
  const [educations, setEducations] = useState<Education[]>([
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      field: "Computer Science",
    },
  ]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("employee");
      if (stored) {
        const employee = JSON.parse(stored);
        const filteredEducation = employee.educations.map((exp: any) => ({
          degree: exp.degree,
          institution: exp.institution,
          field: exp.field,
        }));

        setEducations(filteredEducation);
      }
    } catch (err) {
      console.error("Failed to parse employee from localStorage", err);
    }
  }, []);
  return (
    <RecordCard
      title="Education"
      logo={<GraduationCap className="w-4 h-4 text-theme" />}
      records={educations}
      setRecords={setEducations}
    />
  );
}
