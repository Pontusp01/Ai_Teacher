
import { Question } from '../types';

// Mock data for questions
export const questionsData: Question[] = [
  // COPC course questions
  {
    id: 'copc_intro_1',
    text: 'What is the primary focus of the COPC CX Standard?',
    type: 'multiple-choice',
    options: ['Technology implementation in contact centers', 'Performance management for customer experience operations'],
    correctAnswer: 'Performance management for customer experience operations',
    correctFeedback: 'Correct! The COPC CX Standard is focused on performance management for customer experience operations.',
    incorrectFeedback: 'Not correct. While technology can be part of it, the primary focus is on performance management, not technology implementation.',
    reference: 'Source: COPC CX Standard 7.0, Introduction'
  },
  {
    id: 'copc_leadership_1',
    text: 'According to COPC, what should leadership reviews focus on?',
    type: 'multiple-choice',
    options: ['Technology investments only', 'Performance against KPIs and improvement initiatives'],
    correctAnswer: 'Performance against KPIs and improvement initiatives',
    correctFeedback: 'Correct! COPC requires leadership to regularly review performance against KPIs and the status of improvement initiatives.',
    incorrectFeedback: 'Not correct. While technology may be part of the discussion, COPC leadership reviews should focus on overall performance and improvement.',
    reference: 'Source: COPC CX Standard 7.0, Section 2.1'
  },
  {
    id: 'copc_processes_1',
    text: 'What is required for all processes according to COPC?',
    type: 'multiple-choice',
    options: ['Documentation, metrics, monitoring, and improvement', 'Automation and artificial intelligence'],
    correctAnswer: 'Documentation, metrics, monitoring, and improvement',
    correctFeedback: 'Correct! COPC requires documentation, performance metrics, monitoring, and continuous improvement for all processes.',
    incorrectFeedback: 'Not correct. While automation may be helpful, it\'s not a core requirement for all processes under COPC.',
    reference: 'Source: COPC CX Standard 7.0, Section 3.1'
  },
  {
    id: 'copc_process_theory_1',
    text: 'What is the main purpose of process documentation according to COPC?',
    type: 'multiple-choice',
    options: ['To satisfy audit requirements', 'To ensure process consistency and enable improvement'],
    correctAnswer: 'To ensure process consistency and enable improvement',
    correctFeedback: 'Correct! Process documentation ensures consistency and provides a foundation for process improvement.',
    incorrectFeedback: 'Not quite. While documentation may help with audits, its main purpose is to ensure process consistency and enable continuous improvement.',
    reference: 'Source: COPC CX Standard 7.0, Section 3.1.1'
  },
  {
    id: 'copc_process_management_1',
    text: 'Which of the following is a key component of COPC\'s process management approach?',
    type: 'multiple-choice',
    options: ['Establishing ownership and accountability', 'Minimizing management oversight'],
    correctAnswer: 'Establishing ownership and accountability',
    correctFeedback: 'Correct! Establishing clear ownership and accountability is essential for effective process management.',
    incorrectFeedback: 'Not correct. COPC emphasizes more management oversight and accountability, not less.',
    reference: 'Source: COPC CX Standard 7.0, Section 3.2'
  },
  {
    id: 'copc_process_control_1',
    text: 'What is the purpose of control charts in process control?',
    type: 'multiple-choice',
    options: ['To document process workflows', 'To identify normal vs. special cause variation'],
    correctAnswer: 'To identify normal vs. special cause variation',
    correctFeedback: 'Correct! Control charts help distinguish between normal process variation and special cause variation that requires investigation.',
    incorrectFeedback: 'Not correct. Control charts are analytical tools to identify variations, not documentation tools.',
    reference: 'Source: COPC CX Standard 7.0, Section 3.3'
  },
  {
    id: 'copc_process_kpis_1',
    text: 'A customer service team has an FCR of 68%. What needs to be done to reach COPC standard?',
    type: 'multiple-choice',
    options: ['The team already meets the COPC standard', 'Improve FCR by at least 7 percentage points'],
    correctAnswer: 'Improve FCR by at least 7 percentage points',
    correctFeedback: 'Correct! The COPC standard requires a minimum FCR of 75%, so the team needs to improve by at least 7 percentage points (from 68% to 75%).',
    incorrectFeedback: 'Not correct. The COPC standard requires a minimum FCR of 75%, so 68% doesn\'t meet the standard.',
    reference: 'Source: COPC CX Standard 7.0, Section 3.4'
  },
  
  // Original general questions
  {
    id: 'q1',
    text: 'What is the minimum requirement for FCR according to COPC?',
    type: 'multiple-choice',
    options: ['65%', '70%', '75%', '80%'],
    correctAnswer: '75%',
    correctFeedback: 'Correct! According to the COPC standard, the minimum requirement for FCR (First Contact Resolution) is 75%.',
    incorrectFeedback: 'Not correct. According to the COPC standard, the minimum requirement for FCR (First Contact Resolution) is 75%.',
    reference: 'Source: COPC CX Standard 7.0, Section 4.2.3, page 237'
  },
  {
    id: 'q2',
    text: 'COPC requires that customer satisfaction (CSAT) be at least:',
    type: 'multiple-choice',
    options: ['80%', '85%', '90%', '95%'],
    correctAnswer: '90%',
    correctFeedback: 'Correct! COPC requires that customer satisfaction (CSAT) be at least 90%.',
    incorrectFeedback: 'Partially incorrect. The COPC standard requires that customer satisfaction (CSAT) be at least 90%, not 85%.',
    reference: 'Source: COPC CX Standard 7.0, Section 4.1.2, page 215'
  },
  {
    id: 'q3',
    text: 'What are the most important KPIs for a COPC-certified contact center?',
    type: 'text',
    correctAnswer: 'service level,fcr,csat,quality score',
    correctFeedback: 'Correct! The most important KPIs are Service Level (SL), FCR, Customer Satisfaction (CSAT), and Quality Score.',
    incorrectFeedback: 'Not correct. The most important KPIs are Service Level (SL), FCR, Customer Satisfaction (CSAT), and Quality Score.',
    reference: 'Source: COPC CX Standard 7.0, Section 3.2'
  },
  {
    id: 'q4',
    text: 'How is FCR measured according to COPC?',
    type: 'text',
    correctAnswer: 'internal measurement,external measurement',
    correctFeedback: 'Correct! FCR is measured in two ways: 1. Internal measurement by tracking if the customer returns with the same issue within 5-7 days, 2. External measurement by asking the customer after contact if their problem was resolved on the first attempt.',
    incorrectFeedback: 'Not correct. FCR is measured in two ways according to the COPC standard.',
    reference: 'Source: COPC CX Standard 7.0, Section 4.2'
  }
];
