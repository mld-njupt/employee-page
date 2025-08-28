import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { ReactNode, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "antd";
interface EditableCardProps<T = any> {
  title: string;
  viewContent: ReactNode;
  editContent: (setData: (data: T) => void) => ReactNode;
  initialMode?: "view" | "edit";
  className?: string;
  onSave?: (data: T) => void;
  logo?:React.ReactElement;
}
export default function EditableCard<T = any>({
  title,
  viewContent,
  editContent,
  initialMode = "view",
  className = "",
  onSave,
  logo,
}: EditableCardProps<T>) {
  const [isEditing, setIsEditing] = useState(initialMode === "edit");
  const [formData, setFormData] = useState<T | null>(null);
  const handleToggle = () => {
    setIsEditing((pre) => {
      return !pre;
    });
  };
  const handleSave = () => {
    if (onSave && formData !== null) {
      onSave(formData);
    }
    setIsEditing(false);
  };
  return (
    <div
      data-slot="card"
      className="bg-white text-card-foreground flex flex-col rounded-xl border shadow-lg border-gray-200"
    >
      <div
        data-slot="card-header"
        className="px-6 pt-6  pb-6 border-b border-gray-100"
      >
        <div className="flex items-center justify-between">
          <h4
            data-slot="card-title"
            className="leading-none flex items-center gap-3 text-gray-900"
          >
            <div className="w-8 h-8 bg-theme/10 rounded-lg flex items-center justify-center">
              {logo}
            </div>
            {title}
          </h4>
          {!isEditing && (
            <button
              data-slot="button"
              onClick={handleToggle}
              className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]  border bg-background  h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5 border-theme text-theme hover:bg-theme hover:text-white"
            >
              <Pencil className="w-4 h-4 mr-2"></Pencil>
              Edit
            </button>
          )}
        </div>
      </div>
      <div data-slot="card-content" className="p-6">
        {isEditing ? editContent(setFormData) : viewContent}
        {isEditing ? (
          <div className="flex gap-x-3 mt-3">
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save Changes
            </Button>
            <Button icon={<CloseOutlined />} onClick={handleToggle}>
              Cancel
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
