import { useEffect, useState } from "react";
import EditableCard from "./EditableCard";
import EditAndDelCard from "./EditAndDelCard";
import { GraduationCap } from "lucide-react";
import RecordCard from "./RecordCard";
import { Employee } from "../services/employeeApi";

interface Education {
  degree: string;
  institution: string;
  field: string;
}

export default function EducationCard(props: {
  employee: Employee | undefined;
}) {
  const { employee } = props;
  const [educations, setEducations] = useState<Education[]>([
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      field: "Computer Science",
    },
  ]);
  useEffect(() => {
    if (employee) {
      const filteredEducation = employee.educations.map((exp: any) => ({
        degree: exp.degree,
        institution: exp.institution,
        field: exp.field,
      }));

      setEducations(filteredEducation);
    }
  }, [employee]);
  return (
    <RecordCard
      title="Education"
      logo={<GraduationCap className="w-4 h-4 text-theme" />}
      records={educations}
      setRecords={setEducations}
    />
  );
}
