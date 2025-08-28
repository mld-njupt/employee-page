import { Education } from "./education";
import { WorkExperience } from "./experience";

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  title?: string;
  department?: string;
  location?: string;
  start_date?: string;
  about?: string;
  skills?: string[];
  social_links?: Record<string, string>;
  experiences?:WorkExperience[];
  educations?:Education[]
  
}
