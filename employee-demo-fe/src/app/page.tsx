"use client";
import logo from "../../public/logo.svg";

import Image from "next/image";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";
import AboutCard from "./components/AboutCard";
import SkillsCard from "./components/SkillsCard";
import EducationCard from "./components/EducationCard";
import ExperienceCard from "./components/ExperienceCard";
import MainCard from "./components/MainCard";
import { Employee, employeeService } from "./services/employeeApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [employee, setEmployee] = useState<Employee>();
  useEffect(() => {
    employeeService.getEmployee("1").then((res) => {
      setEmployee(res);
      localStorage.setItem("employee", JSON.stringify(res));
    });
  }, []);
  return (
    <div className="font-sans bg-indigo-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/50 sticky top-0 z-50">
        <div className="container mx-auto  py-4 px-6 flex items-center justify-between">
          <Image
            src={logo}
            alt="Logo"
            width={160}
            height={30}
            className="w-40 h-12"
          />
          <div className="flex items-center">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-theme/10 transition-colors cursor-pointer">
              <BellOutlined className="text-base" />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-theme/10 transition-colors cursor-pointer">
              <SettingOutlined className="text-base" />
            </div>
            <div className="flex items-center ml-3 bg-white/60 rounded-xl px-3 py-1.5 border border-blue-200/50">
              <div className="w-7 h-7 bg-theme rounded-full flex items-center justify-center text-white text-xs mr-2">
                SJ
              </div>
              <span className="text-sm font-medium hidden sm:block">
                {employee?.firstName} {employee?.lastName}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto py-8 px-6 ">
        <div className="max-w-5xl mx-auto space-y-6">
          <MainCard></MainCard>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AboutCard></AboutCard>
              <ExperienceCard></ExperienceCard>
            </div>
            <div className="space-y-6">
              <EducationCard></EducationCard>
              <SkillsCard></SkillsCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
