export interface Education {
  id: number;
  employee_id: number;
  institution: string;
  degree?: string;
  field?: string;
  start_date?: string;
  end_date?: string;
  current: boolean;
}
