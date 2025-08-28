import { Employee } from '../services/employeeApi';

export const mockEmployee: Employee = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@company.com',
  phone: '+1 (555) 123-4567',
  title: 'Senior Software Engineer',
  department: 'Engineering',
  location: 'San Francisco, CA',
  startDate: '2020-03-15',
  about: 'Passionate software engineer with 8+ years of experience in full-stack development. Specializing in React, Node.js, and cloud architecture. Love building scalable solutions and mentoring junior developers.',
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'AWS',
    'Docker',
    'PostgreSQL',
    'GraphQL',
    'Git',
    'Agile Development',
    'Team Leadership'
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: '2020-03-15',
      current: true,
      description: 'Lead development of core platform features serving 1M+ users. Architected microservices infrastructure and mentored team of 5 engineers.'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2018-06-01',
      endDate: '2020-03-14',
      current: false,
      description: 'Built customer-facing web application from scratch using React and Node.js. Implemented CI/CD pipeline and reduced deployment time by 70%.'
    },
    {
      id: '3',
      company: 'WebDev Solutions',
      position: 'Frontend Developer',
      startDate: '2016-08-15',
      endDate: '2018-05-31',
      current: false,
      description: 'Developed responsive websites and web applications for various clients. Collaborated with design team to implement pixel-perfect UI components.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2012-08-15',
      endDate: '2016-05-20',
      current: false
    }
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    github: 'https://github.com/sarahjohnson',
    website: 'https://sarahjohnson.dev'
  }
};