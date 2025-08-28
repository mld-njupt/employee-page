import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Form, Input, Button } from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
interface EditAndDelCardProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  onChange?: (experiences: T[]) => void;
}

export default function EditAndDelCard<T extends Record<string, any>>({
  data,
  setData,
  onChange,
}: EditAndDelCardProps<T>) {
  const [localData, setLocalData] = useState<T[]>(data);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [form] = Form.useForm<T>();
  const handleDelete = (index: number) => {
    const newData = localData.filter((_, i) => i !== index);
    setLocalData(newData);
    setData(newData);
    onChange && onChange(newData);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setShowAddForm(false);
    form.setFieldsValue(localData[index]);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingIndex(null);
    form.resetFields();
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    if (editingIndex !== null) {
      const newData = [...localData];
      newData[editingIndex] = values;
      setLocalData(newData);
      setData(newData);
      onChange && onChange(newData);
    } else {
      const newData = [...localData, values];
      setLocalData(newData);
      setData(newData);
      onChange && onChange(newData);
      setShowAddForm(false);
    }
    setEditingIndex(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setShowAddForm(false);
    form.resetFields();
  };

  return (
    <div className="space-y-4">
      {/* 表单 */}
      {(showAddForm || editingIndex !== null) && (
        <div className="bg-white border rounded-xl p-4">
          <Form form={form} layout="vertical" className=" space-y-2">
            {Object.keys(localData[0] || {}).map((key) => (
              <Form.Item key={key} name={key} label={key}>
                <Input />
              </Form.Item>
            ))}
            <div className="flex gap-2 mt-2">
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleFormSubmit}
              >
                Save
              </Button>
              <Button icon={<CloseOutlined />} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
      {/* 新增按钮 */}
      {!showAddForm && editingIndex === null && (
        <Button type="dashed" className="w-full" onClick={handleAddClick}>
          + Add
        </Button>
      )}
      {localData.map((item, idx) => (
        <div
          key={idx}
          data-slot="card"
          className="bg-white text-card flex flex-col gap-6 rounded-xl border"
        >
          <div data-slot="card-content" className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                {Object.keys(item).map((key) => (
                  <p
                    key={key}
                    className={
                      key === "degree"
                        ? "font-semibold"
                        : "text-muted-foreground text-sm"
                    }
                  >
                    {item[key]}
                  </p>
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleEdit(idx)}
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all px-3 h-8 border rounded-lg hover-accent hover-foreground cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all px-3 h-8 border rounded-lg hover-accent hover-foreground cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
