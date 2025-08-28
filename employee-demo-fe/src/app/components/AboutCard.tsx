import EditableCard from "./EditableCard";
import { User } from "lucide-react";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Employee, employeeService } from "../services/employeeApi";

const { TextArea } = Input;

export default function AboutCard(props: { employee: Employee | undefined }) {
  const { employee } = props;
  const [about, setAbout] = useState("");
  useEffect(() => {
    if (employee) {
      setAbout(employee.about ? employee.about : "");
    }
  }, [employee]);
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
