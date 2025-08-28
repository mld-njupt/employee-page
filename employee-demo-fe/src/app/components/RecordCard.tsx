import React, { useState } from "react";
import EditableCard from "./EditableCard";
import EditAndDelCard from "./EditAndDelCard";
import { Timeline } from "antd";
import { employeeService } from "../services/employeeApi";

interface RecordCardProps<T extends Record<string, any>> {
  title: string;
  logo: React.ReactElement;
  records: T[];
  setRecords: (records: T[]) => void;
}

export default function RecordCard<T extends Record<string, any>>({
  title,
  logo,
  records,
  setRecords,
}: RecordCardProps<T>) {
  const isExperience =
    records.length > 1 && Object.keys(records[0]).includes("description");
  return (
    <EditableCard<{ data: T[] }>
      logo={logo}
      title={title}
      viewContent={
        <div className="space-y-4">
          {isExperience && (
            <Timeline mode="left">
              {records.map((record, idx) => {
                return (
                  <Timeline.Item key={idx}>
                    <div className="space-y-1">
                      <p className="text-theme font-medium">{record.company}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.period}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {record.description}
                      </p>
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          )}

          {!isExperience &&
            records.map((record, idx) => {
              return (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-lg border border-gray-200  space-y-1"
                >
                  {Object.keys(record).map((key) => {
                    const value = record[key];
                    return (
                      <p
                        key={key}
                        className={
                          Object.keys(record)[0] === key
                            ? "font-semibold text-gray-900"
                            : "text-theme font-medium"
                        }
                      >
                        {value}
                      </p>
                    );
                  })}
                </div>
              );
            })}
        </div>
      }
      editContent={(setData) => (
        <EditAndDelCard
          data={records}
          setData={setRecords}
          onChange={(e) => setData({ data: e })}
        />
      )}
      onSave={(data) => {
        title === "experience"
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            employeeService.updateWorkExperiences("1", data.data as any)
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            employeeService.updateEducations("1", data.data as any);
      }}
    />
  );
}
