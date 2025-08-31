import { faker } from '@faker-js/faker';

// Generate education levels using Faker.js
const generateEducationLevels = () => {
  const levels = [];
  
  // Early Childhood
  levels.push({ value: 'early-childhood', label: 'Early Childhood Education (Pre-K)' });
  
  // Primary Education
  levels.push({ value: 'primary', label: 'Primary Education (Elementary School)' });
  levels.push({ value: 'primary-incomplete', label: 'Primary Education (Incomplete)' });
  levels.push({ value: 'primary-complete', label: 'Primary Education (Complete)' });
  
  // Secondary Education
  levels.push({ value: 'lower-secondary', label: 'Lower Secondary Education (Middle School)' });
  levels.push({ value: 'upper-secondary', label: 'Upper Secondary Education (High School)' });
  levels.push({ value: 'secondary-incomplete', label: 'Secondary Education (Incomplete)' });
  levels.push({ value: 'secondary-complete', label: 'Secondary Education (Complete)' });
  levels.push({ value: 'high-school-diploma', label: 'High School Diploma' });
  levels.push({ value: 'ged', label: 'GED (General Educational Development)' });
  
  // Post-Secondary Non-Tertiary
  levels.push({ value: 'post-secondary-non-tertiary', label: 'Post-Secondary Non-Tertiary Education' });
  levels.push({ value: 'vocational-training', label: 'Vocational Training' });
  levels.push({ value: 'technical-certificate', label: 'Technical Certificate' });
  levels.push({ value: 'apprenticeship', label: 'Apprenticeship' });
  
  // Short-Cycle Tertiary Education
  levels.push({ value: 'associate-degree', label: 'Associate Degree' });
  levels.push({ value: 'foundation-degree', label: 'Foundation Degree' });
  levels.push({ value: 'diploma', label: 'Diploma' });
  
  // Bachelor's Level - Using Faker for degree types
  const bachelorDegrees = [
    'Bachelor of Arts (BA)',
    'Bachelor of Science (BS/BSc)',
    'Bachelor of Engineering (BEng)',
    'Bachelor of Business Administration (BBA)',
    'Bachelor of Education (BEd)',
    'Bachelor of Nursing (BN)',
    'Bachelor of Architecture (BArch)',
    'Bachelor of Fine Arts (BFA)',
    'Bachelor of Music (BM)',
    'Bachelor of Computer Science (BCS)',
    'Bachelor of Technology (BTech)',
    'Bachelor of Commerce (BCom)',
    'Bachelor of Laws (LLB)',
    'Bachelor of Medicine (MBBS)',
  ];
  
  bachelorDegrees.forEach(degree => {
    levels.push({ 
      value: degree.toLowerCase().replace(/[^a-z0-9]/g, ''), 
      label: degree 
    });
  });
  
  // Master's Level - Using Faker for degree types
  const masterDegrees = [
    'Master of Arts (MA)',
    'Master of Science (MS/MSc)',
    'Master of Business Administration (MBA)',
    'Master of Education (MEd)',
    'Master of Engineering (MEng)',
    'Master of Public Administration (MPA)',
    'Master of Social Work (MSW)',
    'Master of Fine Arts (MFA)',
    'Master of Music (MM)',
    'Master of Architecture (MArch)',
    'Master of Laws (LLM)',
    'Master of Computer Science (MCS)',
    'Master of Technology (MTech)',
    'Master of Commerce (MCom)',
  ];
  
  masterDegrees.forEach(degree => {
    levels.push({ 
      value: degree.toLowerCase().replace(/[^a-z0-9]/g, ''), 
      label: degree 
    });
  });
  
  // Doctoral Level
  levels.push({ value: 'phd', label: 'Doctor of Philosophy (PhD)' });
  levels.push({ value: 'doctor-medicine', label: 'Doctor of Medicine (MD)' });
  levels.push({ value: 'doctor-dental', label: 'Doctor of Dental Medicine (DMD)' });
  levels.push({ value: 'doctor-veterinary', label: 'Doctor of Veterinary Medicine (DVM)' });
  levels.push({ value: 'doctor-pharmacy', label: 'Doctor of Pharmacy (PharmD)' });
  levels.push({ value: 'doctor-education', label: 'Doctor of Education (EdD)' });
  levels.push({ value: 'doctor-business', label: 'Doctor of Business Administration (DBA)' });
  levels.push({ value: 'doctor-psychology', label: 'Doctor of Psychology (PsyD)' });
  levels.push({ value: 'doctor-nursing', label: 'Doctor of Nursing Practice (DNP)' });
  
  // Professional Certifications - Using Faker for job titles as inspiration
  const certifications = [
    'Certified Public Accountant (CPA)',
    'Project Management Professional (PMP)',
    'Chartered Financial Analyst (CFA)',
    'Certified Information Systems Security Professional (CISSP)',
    'Cisco Certified Network Associate (CCNA)',
    'AWS Certified Solutions Architect',
    'Google Certified Professional',
    'Microsoft Certified Professional',
    'Certified Scrum Master (CSM)',
    'Certified Data Scientist',
    'Certified Ethical Hacker (CEH)',
    'Certified Information Systems Auditor (CISA)',
    'Certified in Risk and Information Systems Control (CRISC)',
    'Certified Information Privacy Professional (CIPP)',
  ];
  
  certifications.forEach(cert => {
    levels.push({ 
      value: cert.toLowerCase().replace(/[^a-z0-9]/g, '-'), 
      label: cert 
    });
  });
  
  // Other
  levels.push({ value: 'self-taught', label: 'Self-Taught' });
  levels.push({ value: 'online-courses', label: 'Online Courses/Certificates' });
  levels.push({ value: 'bootcamp', label: 'Coding Bootcamp' });
  levels.push({ value: 'other', label: 'Other' });
  
  return levels.sort((a, b) => a.label.localeCompare(b.label));
};

export const educationLevels = generateEducationLevels();

// Function to get short forms for education levels
export const getEducationShortForm = (educationLevel) => {
  if (!educationLevel) return 'Not specified';
  
  const shortForms = {
    // Early Childhood
    'earlychildhood': 'Pre-K',
    
    // Primary & Secondary
    'primary': 'Elementary',
    'primaryincomplete': 'Elementary (Incomplete)',
    'primarycomplete': 'Elementary (Complete)',
    'lowersecondary': 'Middle School',
    'uppersecondary': 'High School',
    'secondaryincomplete': 'High School (Incomplete)',
    'secondarycomplete': 'High School (Complete)',
    'highschooldiploma': 'High School Diploma',
    'ged': 'GED',
    
    // Post-Secondary
    'postsecondarynontertiary': 'Post-Secondary',
    'vocationaltraining': 'Vocational',
    'technicalcertificate': 'Tech Certificate',
    'apprenticeship': 'Apprenticeship',
    'associatedegree': 'Associate Degree',
    'foundationdegree': 'Foundation Degree',
    'diploma': 'Diploma',
    
    // Bachelor's
    'bachelorofartsba': 'BA',
    'bachelorofsciencebsbsc': 'BS/BSc',
    'bachelorofengineeringbeng': 'BEng',
    'bachelorofbusinessadministrationbba': 'BBA',
    'bachelorofeducationbed': 'BEd',
    'bachelorofnursingbn': 'BN',
    'bachelorofarchitecturebarch': 'BArch',
    'bacheloroffineartsbfa': 'BFA',
    'bachelorofmusicbm': 'BM',
    'bachelorofcomputersciencebcs': 'BCS',
    'bacheloroftechnologybtech': 'BTech',
    'bachelorofcommercebcom': 'BCom',
    'bacheloroflawsllb': 'LLB',
    'bachelorofmedicinembbs': 'MBBS',
    
    // Master's
    'masterofartsma': 'MA',
    'masterofsciencemsmsc': 'MS/MSc',
    'masterofbusinessadministrationmba': 'MBA',
    'masterofeducationmed': 'MEd',
    'masterofengineeringmeng': 'MEng',
    'masterofpublicadministrationmpa': 'MPA',
    'masterofsocialworkmsw': 'MSW',
    'masteroffineartsmfa': 'MFA',
    'masterofmusicmm': 'MM',
    'masterofarchitecturemarch': 'MArch',
    'masteroflawsllm': 'LLM',
    'masterofcomputersciencemcs': 'MCS',
    'masteroftechnologymtech': 'MTech',
    'masterofcommercemcom': 'MCom',
    
    // Doctoral
    'phd': 'PhD',
    'doctormedicine': 'MD',
    'doctordental': 'DMD',
    'doctorveterinary': 'DVM',
    'doctorpharmacy': 'PharmD',
    'doctoreducation': 'EdD',
    'doctorbusiness': 'DBA',
    'doctorpsychology': 'PsyD',
    'doctornursing': 'DNP',
    
    // Certifications
    'certifiedpublicaccountantcpa': 'CPA',
    'projectmanagementprofessionalpmp': 'PMP',
    'charteredfinancialanalystcfa': 'CFA',
    'certifiedinformationsystemssecurityprofessionalcissp': 'CISSP',
    'ciscocertifiednetworkassociateccna': 'CCNA',
    'awscertifiedsolutionsarchitect': 'AWS Certified',
    'googlecertifiedprofessional': 'Google Certified',
    'microsoftcertifiedprofessional': 'Microsoft Certified',
    'certifiedscrummastercsm': 'CSM',
    'certifieddatascientist': 'Data Scientist',
    'certifiedethicalhackerceh': 'CEH',
    'certifiedinformationsystemsauditorcisa': 'CISA',
    'certifiedinriskandinformationsystemscontrolcrisc': 'CRISC',
    'certifiedinformationprivacyprofessionalcipp': 'CIPP',
    
    // Other
    'selftaught': 'Self-Taught',
    'onlinecourses': 'Online Courses',
    'bootcamp': 'Bootcamp',
    'other': 'Other'
  };
  
  // Clean the input to match the keys
  const cleanInput = educationLevel.toLowerCase().replace(/[^a-z0-9]/g, '');
  return shortForms[cleanInput] || educationLevel;
};
