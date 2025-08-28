export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title: string;
  department: string;
  location?: string;
  startDate: string;
  profileImage?: string;
  about?: string;
  skills: string[];
  experience?: WorkExperience[];
  education: Education[];
  socialLinks?: SocialLinks;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export class EmployeeService {
  private baseUrl = "/api/employees";

  async getEmployee(id: string): Promise<Employee> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async updateWorkExperiences(
    employeeId: string,
    experiences: WorkExperience[]
  ): Promise<WorkExperience[]> {
    const response = await fetch(`${this.baseUrl}/${employeeId}/experience`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experiences),
    });
    return response.json();
  }
  async updateEducations(
    employeeId: string,
    educations: Education[]
  ): Promise<Education[]> {
    const response = await fetch(`${this.baseUrl}/${employeeId}/education`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(educations),
    });
    return response.json();
  }
}

export const employeeService = new EmployeeService();
