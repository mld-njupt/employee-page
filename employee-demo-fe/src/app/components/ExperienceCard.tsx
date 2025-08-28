import { Briefcase } from "lucide-react";
import RecordCard from "./RecordCard";
import { useEffect, useState } from "react";
import { Employee } from "../services/employeeApi";

interface Experience {
  company: string;
  position: string;
  description: string;
}
export default function ExperienceCard(props: {
  employee: Employee | undefined;
}) {
  const { employee } = props;
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "",
      position: "",
      description: "",
    },
  ]);
  useEffect(() => {
    if (employee) {
      const filteredExperiences = employee.experiences?.map((exp: any) => ({
        company: exp.company,
        position: exp.position,
        description: exp.description,
      }));

      setExperiences(filteredExperiences as Experience[]);
    }
  }, [employee]);
  return (
    <RecordCard
      title="Experience"
      logo={<Briefcase className="w-4 h-4 text-theme" />}
      records={experiences}
      setRecords={setExperiences}
    />
  );
}
