export interface WorkExperience {
  id: number;
  employee_id: number;
  company: string;
  position: string;
  start_date?: string;
  end_date?: string;
  current: boolean;
  description?: string;
}
