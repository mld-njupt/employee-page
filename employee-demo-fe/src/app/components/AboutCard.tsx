import EditableCard from "./EditableCard";
import { User } from "lucide-react";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { employeeService } from "../services/employeeApi";

const { TextArea } = Input;

export default function AboutCard() {
  const [about, setAbout] = useState("");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("employee");
      if (stored) {
        const employee = JSON.parse(stored);
        setAbout(employee.about);
      }
    } catch (err) {
      console.error("Failed to parse employee from localStorage", err);
    }
  }, []);
  return (
    <EditableCard<{ about: string }>
      logo={<User className="w-4 h-4 text-theme" />}
      title="about"
      viewContent={<p className="text-gray-600">{about}</p>}
      editContent={(setData) => (
        <TextArea
          defaultValue={about}
          onChange={(e) => {
            setData({ about: e.target.value });
            setAbout(e.target.value);
          }}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3 }}
        />
      )}
      onSave={(data) => {
        employeeService.updateEmployee("1", data);
      }}
    ></EditableCard>
  );
}
