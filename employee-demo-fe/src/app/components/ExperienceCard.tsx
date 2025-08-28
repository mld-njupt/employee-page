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
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",

      description:
        "Lead development of core platform features serving 1M+ users. Architected microservices infrastructure and mentored team of 5 engineers.",
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",

      description:
        "Built customer-facing web application from scratch using React and Node.js. Implemented CI/CD pipeline and reduced deployment time by 70%.",
    },
    {
      company: "WebDev Solutions",
      position: "Frontend Developer",

      description:
        "Developed responsive websites and web applications for various clients. Collaborated with design team to implement pixel-perfect UI components.",
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
