
export interface QuestionData {
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOption: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export const getQuestionsForModule = (courseId: string, moduleIndex: number): QuestionData[] => {
  if (courseId === 'course1') {
    if (moduleIndex === 0) {
      return [
        {
          question: "What is the primary focus of the COPC CX Standard?",
          options: [
            { id: "option1", text: "Technology implementation in contact centers" },
            { id: "option2", text: "Performance management for customer experience operations" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! The COPC CX Standard is focused on performance management for customer experience operations.",
            incorrect: "Not correct. While technology can be part of it, the primary focus is on performance management, not technology implementation."
          }
        },
        {
          question: "Which of the following is a key principle of COPC?",
          options: [
            { id: "option1", text: "Minimizing customer contact" },
            { id: "option2", text: "Data-driven decision making" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Data-driven decision making is a key principle of COPC's methodology.",
            incorrect: "Not correct. COPC focuses on optimizing customer contact, not minimizing it."
          }
        },
        {
          question: "What is a primary goal of the COPC CX Standard?",
          options: [
            { id: "option1", text: "Reducing operational costs only" },
            { id: "option2", text: "Improving both customer satisfaction and operational efficiency" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC aims to improve both customer satisfaction and operational efficiency.",
            incorrect: "Not correct. While cost reduction may be a benefit, COPC focuses on balancing customer satisfaction with efficiency."
          }
        },
        {
          question: "When was the first version of COPC Standards published?",
          options: [
            { id: "option1", text: "1996" },
            { id: "option2", text: "2005" }
          ],
          correctOption: "option1",
          feedback: {
            correct: "Correct! The first version of COPC Standards was published in 1996.",
            incorrect: "Not correct. The first version was published in 1996, not 2005."
          }
        },
        {
          question: "What industry was the COPC Standard originally developed for?",
          options: [
            { id: "option1", text: "Retail stores" },
            { id: "option2", text: "Customer contact centers" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC was originally developed for customer contact centers.",
            incorrect: "Not correct. COPC was developed specifically for customer contact centers, not retail stores."
          }
        }
      ];
    } else if (moduleIndex === 1) {
      return [
        {
          question: "According to COPC, what should leadership reviews focus on?",
          options: [
            { id: "option1", text: "Technology investments only" },
            { id: "option2", text: "Performance against KPIs and improvement initiatives" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC requires leadership to regularly review performance against KPIs and the status of improvement initiatives.",
            incorrect: "Not correct. While technology may be part of the discussion, COPC leadership reviews should focus on overall performance and improvement."
          }
        },
        {
          question: "What is a key leadership requirement in COPC?",
          options: [
            { id: "option1", text: "Minimizing operational costs" },
            { id: "option2", text: "Alignment of organizational goals with customer needs" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC emphasizes aligning organizational goals with customer needs.",
            incorrect: "Incorrect. While cost management is important, COPC prioritizes customer-centric alignment over pure cost reduction."
          }
        },
        {
          question: "How often should leadership reviews occur according to COPC?",
          options: [
            { id: "option1", text: "Annually" },
            { id: "option2", text: "At least quarterly" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC recommends leadership reviews at least quarterly.",
            incorrect: "Not correct. Annual reviews are not frequent enough according to COPC standards."
          }
        },
        {
          question: "What role does leadership play in process improvement according to COPC?",
          options: [
            { id: "option1", text: "Delegate all improvement activities to staff" },
            { id: "option2", text: "Actively sponsor and monitor improvement initiatives" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Leadership must actively sponsor and monitor improvement initiatives.",
            incorrect: "Not correct. COPC requires active leadership involvement, not just delegation."
          }
        },
        {
          question: "What is required for leadership planning according to COPC?",
          options: [
            { id: "option1", text: "Focus only on long-term goals" },
            { id: "option2", text: "Balance short-term results with long-term strategies" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC requires balancing short-term results with long-term strategies.",
            incorrect: "Not correct. Focusing only on long-term goals without addressing short-term results is not compliant with COPC."
          }
        }
      ];
    } else if (moduleIndex === 2) {
      return [
        {
          question: "What is required for all processes according to COPC?",
          options: [
            { id: "option1", text: "Documentation, metrics, monitoring, and improvement" },
            { id: "option2", text: "Automation and artificial intelligence" }
          ],
          correctOption: "option1",
          feedback: {
            correct: "Correct! COPC requires documentation, performance metrics, monitoring, and continuous improvement for all processes.",
            incorrect: "Not correct. While automation may be helpful, it's not a core requirement for all processes under COPC."
          }
        },
        {
          question: "What are the three process categories in COPC?",
          options: [
            { id: "option1", text: "Customer-Facing, Support, and Business Processes" },
            { id: "option2", text: "Sales, Service, and Administrative Processes" }
          ],
          correctOption: "option1",
          feedback: {
            correct: "Correct! COPC categorizes processes as Customer-Facing, Support, and Business Processes.",
            incorrect: "Incorrect. COPC uses a different categorization system that focuses on the function of processes rather than departments."
          }
        },
        {
          question: "How does COPC define a process?",
          options: [
            { id: "option1", text: "A job description for an employee" },
            { id: "option2", text: "A set of activities that transform inputs into outputs" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC defines a process as a set of activities that transform inputs into outputs.",
            incorrect: "Not correct. A process is not the same as a job description."
          }
        },
        {
          question: "What is the purpose of process documentation according to COPC?",
          options: [
            { id: "option1", text: "To fulfill certification requirements only" },
            { id: "option2", text: "To enable consistency, training, and improvement" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Process documentation enables consistency, effective training, and continuous improvement.",
            incorrect: "Not correct. Documentation serves practical purposes beyond certification requirements."
          }
        },
        {
          question: "What tool does COPC recommend for visualizing processes?",
          options: [
            { id: "option1", text: "Gantt charts" },
            { id: "option2", text: "Process flowcharts" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC recommends process flowcharts for visualizing processes.",
            incorrect: "Not correct. Gantt charts are project management tools, not process visualization tools."
          }
        }
      ];
    } else if (moduleIndex === 3) {
      return [
        {
          question: "What is the main purpose of process documentation according to COPC?",
          options: [
            { id: "option1", text: "To satisfy audit requirements" },
            { id: "option2", text: "To ensure process consistency and enable improvement" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Process documentation ensures consistency and provides a foundation for process improvement.",
            incorrect: "Not quite. While documentation may help with audits, its main purpose is to ensure process consistency and enable continuous improvement."
          }
        },
        {
          question: "What cycle does COPC recommend for process management?",
          options: [
            { id: "option1", text: "Six Sigma DMEDI" },
            { id: "option2", text: "PDCA (Plan-Do-Check-Act)" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC recommends the PDCA (Plan-Do-Check-Act) cycle for process management.",
            incorrect: "Incorrect. While Six Sigma methods can be used, COPC specifically emphasizes PDCA as the core process management cycle."
          }
        },
        {
          question: "What should process documentation include?",
          options: [
            { id: "option1", text: "Only step-by-step instructions" },
            { id: "option2", text: "Procedures, KPIs, roles, and controls" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Process documentation should include procedures, KPIs, roles, and controls.",
            incorrect: "Not correct. Process documentation needs to be comprehensive, not just step-by-step instructions."
          }
        },
        {
          question: "How often should processes be reviewed according to COPC?",
          options: [
            { id: "option1", text: "Only when problems occur" },
            { id: "option2", text: "Regularly and when significant changes occur" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Processes should be reviewed regularly and when significant changes occur.",
            incorrect: "Not correct. Waiting for problems to occur before reviewing processes is reactive, not proactive."
          }
        },
        {
          question: "What is the role of metrics in process theory?",
          options: [
            { id: "option1", text: "To fulfill reporting requirements" },
            { id: "option2", text: "To measure, monitor, and improve process performance" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Metrics are used to measure, monitor, and improve process performance.",
            incorrect: "Not correct. Metrics serve a broader purpose than just reporting requirements."
          }
        }
      ];
    } else if (moduleIndex === 4) {
      return [
        {
          question: "Which of the following is a key component of COPC's process management approach?",
          options: [
            { id: "option1", text: "Establishing ownership and accountability" },
            { id: "option2", text: "Minimizing management oversight" }
          ],
          correctOption: "option1",
          feedback: {
            correct: "Correct! Establishing clear ownership and accountability is essential for effective process management.",
            incorrect: "Not correct. COPC emphasizes more management oversight and accountability, not less."
          }
        },
        {
          question: "What is the purpose of process governance in COPC?",
          options: [
            { id: "option1", text: "To ensure processes are properly managed and improved" },
            { id: "option2", text: "To reduce the need for leadership involvement" }
          ],
          correctOption: "option1",
          feedback: {
            correct: "Correct! Process governance ensures proper management and improvement of processes.",
            incorrect: "Incorrect. COPC actually emphasizes more leadership involvement through governance structures."
          }
        },
        {
          question: "Who should be involved in process reviews?",
          options: [
            { id: "option1", text: "Only process owners" },
            { id: "option2", text: "Process owners, users, and stakeholders" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Process reviews should involve process owners, users, and stakeholders.",
            incorrect: "Not correct. Involving only process owners limits the effectiveness of process reviews."
          }
        },
        {
          question: "How should process changes be managed?",
          options: [
            { id: "option1", text: "Implement changes immediately when needed" },
            { id: "option2", text: "Through a controlled change management process" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Process changes should be managed through a controlled change management process.",
            incorrect: "Not correct. Immediate implementation without proper control can lead to problems."
          }
        },
        {
          question: "What is required for effective process management?",
          options: [
            { id: "option1", text: "Only tracking metrics" },
            { id: "option2", text: "Clear roles, responsibilities, and performance standards" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Effective process management requires clear roles, responsibilities, and performance standards.",
            incorrect: "Not correct. Tracking metrics alone is insufficient for effective process management."
          }
        }
      ];
    } else if (moduleIndex === 5) {
      return [
        {
          question: "What is the purpose of control charts in process control?",
          options: [
            { id: "option1", text: "To document process workflows" },
            { id: "option2", text: "To identify normal vs. special cause variation" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Control charts help distinguish between normal process variation and special cause variation that requires investigation.",
            incorrect: "Not correct. Control charts are analytical tools to identify variations, not documentation tools."
          }
        },
        {
          question: "What are the three types of control mechanisms required by COPC?",
          options: [
            { id: "option1", text: "Input, in-process, and output controls" },
            { id: "option2", text: "Financial, operational, and customer controls" }
          ],
          correctOption: "option1",
          feedback: {
            correct: "Correct! COPC requires input, in-process, and output controls for comprehensive process control.",
            incorrect: "Incorrect. While those controls exist, COPC specifically categorizes controls based on when they occur in the process."
          }
        },
        {
          question: "What is the main purpose of process control?",
          options: [
            { id: "option1", text: "To find people making mistakes" },
            { id: "option2", text: "To ensure consistent process performance" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Process control aims to ensure consistent process performance.",
            incorrect: "Not correct. The focus is on process improvement, not finding individual mistakes."
          }
        },
        {
          question: "How often should control checks be performed?",
          options: [
            { id: "option1", text: "Only when problems occur" },
            { id: "option2", text: "At defined intervals based on risk and volume" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Control checks should be performed at defined intervals based on risk and volume.",
            incorrect: "Not correct. Waiting for problems to occur is reactive, not proactive control."
          }
        },
        {
          question: "What should happen when control limits are exceeded?",
          options: [
            { id: "option1", text: "Wait to see if it happens again" },
            { id: "option2", text: "Investigate and take corrective action immediately" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Exceeding control limits requires immediate investigation and corrective action.",
            incorrect: "Not correct. Waiting to act on control limit violations can lead to more serious problems."
          }
        }
      ];
    } else if (moduleIndex === 6) {
      return [
        {
          question: "A customer service team has an FCR of 68%. What needs to be done to reach COPC standard?",
          options: [
            { id: "option1", text: "The team already meets the COPC standard" },
            { id: "option2", text: "Improve FCR by at least 7 percentage points" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! The COPC standard requires a minimum FCR of 75%, so the team needs to improve by at least 7 percentage points (from 68% to 75%).",
            incorrect: "Not correct. The COPC standard requires a minimum FCR of 75%, so 68% doesn't meet the standard."
          }
        },
        {
          question: "What is the minimum Quality Score required by COPC standards?",
          options: [
            { id: "option1", text: "85%" },
            { id: "option2", text: "90%" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC requires a minimum Quality Score of 90% compliance with quality standards.",
            incorrect: "Incorrect. COPC requires a higher minimum Quality Score of 90%."
          }
        },
        {
          question: "What is the COPC standard for Customer Satisfaction (CSAT)?",
          options: [
            { id: "option1", text: "At least 85%" },
            { id: "option2", text: "At least 90%" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC requires a minimum CSAT score of 90%.",
            incorrect: "Not correct. The COPC standard for CSAT is higher than 85%."
          }
        },
        {
          question: "How often should KPIs be reviewed according to COPC?",
          options: [
            { id: "option1", text: "Monthly" },
            { id: "option2", text: "At least weekly for key metrics" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! Key metrics should be reviewed at least weekly according to COPC.",
            incorrect: "Not correct. Monthly reviews are not frequent enough for key metrics under COPC."
          }
        },
        {
          question: "What is the recommended service level for phone contacts?",
          options: [
            { id: "option1", text: "70% in 30 seconds" },
            { id: "option2", text: "80% in 20 seconds" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! COPC recommends a service level of 80% of calls answered in 20 seconds.",
            incorrect: "Not correct. The COPC recommended service level is higher and faster than 70% in 30 seconds."
          }
        }
      ];
    }
  } else if (courseId === 'course4') {
    // Add KPI Implementation Guide questions here if needed
    if (moduleIndex === 0) {
      return [
        {
          question: "What is the main focus of this module?",
          options: [
            { id: "option1", text: "Theoretical concepts" },
            { id: "option2", text: "Practical application" }
          ],
          correctOption: "option2",
          feedback: {
            correct: "Correct! The focus is on practical application of concepts.",
            incorrect: "Not quite. While theory is important, the main focus is on practical application."
          }
        }
      ];
    }
  }
  
  return [
    {
      question: "What is the main focus of this module?",
      options: [
        { id: "option1", text: "Theoretical concepts" },
        { id: "option2", text: "Practical application" }
      ],
      correctOption: "option2",
      feedback: {
        correct: "Correct! The focus is on practical application of concepts.",
        incorrect: "Not quite. While theory is important, the main focus is on practical application."
      }
    }
  ];
};
