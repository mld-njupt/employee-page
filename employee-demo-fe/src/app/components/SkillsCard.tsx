import EditableCard from "./EditableCard";
import React, { SVGProps, useEffect, useState } from "react";
import { Award } from "lucide-react";

import { Button, Input, Tag, ConfigProvider } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { Employee, employeeService } from "../services/employeeApi";

interface ContentProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  onChange?: (skills: string[]) => void;
}

function ViewContent(props: ContentProps) {
  const { tags, setTags } = props;
  return (
    <>
      <div className="mb-4">
        {tags.map((tag) => {
          return (
            <span key={tag} style={{ display: "inline-block" }}>
              <Tag bordered={false}>{tag}</Tag>
            </span>
          );
        })}
      </div>
    </>
  );
}
function EditContent(props: ContentProps) {
  const { tags, setTags, onChange } = props;
  const [value, setValue] = useState("");
  const handleAdd = () => {
    if (value && tags.indexOf(value) === -1) {
      setTags([...tags, value]);
      onChange && onChange([...tags, value]);
    }
    setValue("");
  };
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    onChange && onChange(newTags);
    setTags(newTags);
  };
  const forMap = (tag: string) => (
    <span key={tag} style={{ display: "inline-block" }}>
      <Tag
        closable
        bordered={false}
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );
  const tagChild = (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            defaultBg: "rgba(0, 94, 255, 0.1)",
            colorBorder: "rgba(0, 94, 255, 0.1)",
            defaultColor: "#000",
            algorithm: true, // 启用算法
          },
        },
      }}
    >
      {tags.map(forMap)}
    </ConfigProvider>
  );
  return (
    <>
      <div className="mb-4">
        <TweenOneGroup
          appear={false}
          enter={{ scale: 0.8, opacity: 0, type: "from", duration: 100 }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          onEnd={(e) => {
            if (e.type === "appear" || e.type === "enter") {
              (e.target as any).style = "display: inline-block";
            }
          }}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          size="small"
          style={{ width: 120 }}
          placeholder="e.g.,Javascript"
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button
          type="primary"
          size="small"
          onClick={handleAdd}
          disabled={!value.trim()}
        >
          +
        </Button>
      </div>
    </>
  );
}
export default function SkillsCard(props: { employee: Employee | undefined }) {
  const { employee } = props;
  const [tags, setTags] = useState([
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "GraphQL",
    "Git",
    "Agile Development",
    "Team Leadership",
  ]);
  useEffect(() => {
    if (employee) {
      setTags(employee.skills);
    }
  }, [employee]);
  return (
    <EditableCard<{ skills: string[] }>
      logo={<Award className="w-4 h-4 text-theme" />}
      title="skills"
      viewContent={<ViewContent tags={tags} setTags={setTags}></ViewContent>}
      editContent={(setData) => (
        <EditContent
          tags={tags}
          setTags={setTags}
          onChange={(e) => {
            setData({ skills: e });
          }}
        ></EditContent>
      )}
      onSave={(data) => {
        employeeService.updateEmployee("1", data);
      }}
    ></EditableCard>
  );
}
