import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Divider, Form, Input } from "antd";
import {
  Building,
  Calendar,
  ExternalLink,
  Mail,
  MapPin,
  Pencil,
} from "lucide-react";
import { Employee, employeeService } from "../services/employeeApi";

interface SocialLinks {
  linkedin: string;
  github: string;
  website: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  location: string;
  socialLinks: SocialLinks;
}
interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
}

function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
      <div className="w-6 h-6 bg-theme/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      {title}
    </h3>
  );
}
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
}

function InfoItem({ icon, label }: InfoItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 bg-theme/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      {label}
    </div>
  );
}
interface LinkButtonProps {
  href: string;
  label: string;
}

function LinkButton({ href, label }: LinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all border bg-background h-8 rounded-md gap-1.5 px-3 border-gray-300 text-gray-700 hover:bg-gray-50"
    >
      {label} <ExternalLink className="w-3 h-3 ml-1" />
    </a>
  );
}

export default function MainCard(props: { employee: Employee | undefined }) {
  const { employee } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    department: "",
    location: "",
    socialLinks: {
      linkedin: "",
      github: "",
      website: "",
    },
  });
  // const [form] = Form.useForm<FormData>();
  const handleToggle = () => {
    setIsEditing((pre) => {
      return !pre;
    });
  };
  const handleSave = () => {
    employeeService.updateEmployee("1", formData);
    setIsEditing(false);
  };
  const hanldeValuesChange = (
    changedValues: Partial<FormData>,
    allValues: FormData
  ) => {
    console.log(allValues);

    setFormData((prev) => {
      allValues.socialLinks = prev.socialLinks;
      return allValues;
    });
  };
  useEffect(() => {
    if (employee) {
      // 只取 formData 需要的字段
      const newFormData: FormData = {
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        title: employee.title || "",
        department: employee.department || "",
        location: employee.location || "",
        socialLinks: {
          linkedin: employee.socialLinks?.linkedin || "",
          github: employee.socialLinks?.github || "",
          website: employee.socialLinks?.website || "",
        },
      };
      setFormData(newFormData);
    }
  }, [employee]);
  return (
    <div className="flex flex-wrap bg-white text-card-foreground p-8 rounded-xl border shadow-lg border-gray-200 gap-8">
      <div className=" text-white text-4xl bg-theme rounded-full justify-center items-center flex w-32 h-32 border-4 border-gray-100 shadow-lg">
        <span>SJ</span>
      </div>
      {!isEditing && (
        <div className="grow">
          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-900">
                {formData?.firstName}, {formData?.lastName}
              </h1>
              <p className="text-xl text-theme mb-4">{formData?.title}</p>

              <div className="flex flex-wrap gap-4 text-gray-600">
                <InfoItem
                  icon={<Building className="w-3 h-3 text-theme" />}
                  label={formData.department}
                />
                <InfoItem
                  icon={<MapPin className="w-3 h-3 text-theme" />}
                  label={formData.location}
                />
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={handleToggle}
                className="flex items-center border border-theme text-theme px-3 h-8 rounded-md hover:bg-theme hover:text-white"
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </button>
            )}
          </div>

          <Divider />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <SectionTitle
                icon={<Mail className="w-4 h-4 text-theme" />}
                title="Contact Information"
              />
              <div className="space-y-3 pl-8">
                <a
                  href={`mailto:${formData.email}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-theme"
                >
                  📧 {formData.email}
                </a>
                <a
                  href={`tel:${formData.phone}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-theme"
                >
                  📱 {formData.phone}
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle
                icon={<ExternalLink className="w-4 h-4 text-theme" />}
                title="Professional Links"
              />
              <div className="flex flex-wrap gap-2 pl-8">
                <LinkButton
                  href={formData.socialLinks.linkedin}
                  label="LinkedIn"
                />
                <LinkButton href={formData.socialLinks.github} label="GitHub" />
                <LinkButton
                  href={formData.socialLinks.website}
                  label="Website"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="grow min-w-0 [max-width:calc(100%-8rem-2rem)]">
          <Form
            // form={form}
            layout="vertical"
            className="flex gap-x-2 space-y-2 flex-wrap"
            initialValues={formData}
            onValuesChange={hanldeValuesChange}
          >
            {Object.keys(formData).map(
              (key) =>
                key !== "socialLinks" && (
                  <Form.Item key={key} name={key} label={key}>
                    <Input />
                  </Form.Item>
                )
            )}
          </Form>
          <div className="flex gap-x-3 mt-3">
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save Changes
            </Button>
            <Button icon={<CloseOutlined />} onClick={handleToggle}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
