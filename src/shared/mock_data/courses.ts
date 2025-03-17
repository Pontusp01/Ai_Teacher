import { Course, CourseProgress } from '../types';

// Mock data for courses
export const coursesData: Course[] = [
  {
    id: 'course1',
    title: 'COPC Basic Course',
    description: 'Basic course in the COPC standard for contact centers',
    progress: 0
  },
  {
    id: 'course2',
    title: 'Business English for Customer Service',
    description: 'Course in business English for customer service representatives',
    progress: 0
  },
  {
    id: 'course3',
    title: 'Product Training X',
    description: 'Training in product range X',
    progress: 0
  },
  {
    id: 'course4',
    title: 'KPI Implementation Guide',
    description: 'Comprehensive guide for implementing and monitoring key performance indicators in contact centers',
    progress: 0
  },
  {
    id: 'course5',
    title: 'COPC CX Standard 6.2',
    description: 'Advanced course in COPC CX Standard version 6.2',
    progress: 0
  },
  {
    id: 'course6',
    title: 'Quality Monitoring Form',
    description: 'Training on how to use the quality monitoring form',
    progress: 0
  }
];

// Mock data for course progress
export const courseProgressData: CourseProgress[] = [
  {
    courseId: 'course1',
    percentComplete: 0,
    lastActivity: '2025-03-15T10:24:00Z',
    timeSpent: 720, // 12 hours in minutes
    modules: [
      {
        moduleId: '1',
        percentComplete: 0,
        lastActivity: '2025-03-10T15:30:00Z'
      },
      {
        moduleId: '2',
        percentComplete: 0,
        lastActivity: '2025-03-12T14:45:00Z'
      },
      {
        moduleId: '3',
        percentComplete: 0,
        lastActivity: '2025-03-15T10:24:00Z'
      },
      {
        moduleId: '3.1',
        percentComplete: 0,
        lastActivity: '2025-03-15T10:24:00Z'
      },
      {
        moduleId: '3.2',
        percentComplete: 0
      },
      {
        moduleId: '3.3',
        percentComplete: 0
      },
      {
        moduleId: '3.4',
        percentComplete: 0
      }
    ]
  },
  {
    courseId: 'course2',
    percentComplete: 0,
    lastActivity: '2025-03-14T11:15:00Z',
    timeSpent: 240, // 4 hours in minutes
    modules: [
      {
        moduleId: '1',
        percentComplete: 0,
        lastActivity: '2025-03-14T11:15:00Z'
      },
      {
        moduleId: '2',
        percentComplete: 0,
        lastActivity: '2025-03-14T11:15:00Z'
      },
      {
        moduleId: '3',
        percentComplete: 0
      }
    ]
  },
  {
    courseId: 'course3',
    percentComplete: 0,
    lastActivity: '2025-03-08T09:20:00Z',
    timeSpent: 30, // 30 minutes
    modules: [
      {
        moduleId: '1',
        percentComplete: 0,
        lastActivity: '2025-03-08T09:20:00Z'
      },
      {
        moduleId: '2',
        percentComplete: 0
      },
      {
        moduleId: '3',
        percentComplete: 0
      }
    ]
  },
  {
    courseId: 'course4',
    percentComplete: 0,
    lastActivity: '2025-03-18T08:00:00Z',
    timeSpent: 180, // 3 hours
    modules: [
      {
        moduleId: '1',
        percentComplete: 0,
        lastActivity: '2025-03-18T08:00:00Z'
      },
      {
        moduleId: '2',
        percentComplete: 0,
        lastActivity: '2025-03-18T08:00:00Z'
      },
      {
        moduleId: '3',
        percentComplete: 0
      },
      {
        moduleId: '4',
        percentComplete: 0
      },
      {
        moduleId: '5',
        percentComplete: 0
      }
    ]
  },
  {
    courseId: 'course5',
    percentComplete: 0,
    lastActivity: '2025-03-01T00:00:00Z',
    timeSpent: 0,
    modules: [
      {
        moduleId: '1',
        percentComplete: 0
      },
      {
        moduleId: '2',
        percentComplete: 0
      },
      {
        moduleId: '3',
        percentComplete: 0
      }
    ]
  },
  {
    courseId: 'course6',
    percentComplete: 0,
    lastActivity: '2025-03-01T00:00:00Z',
    timeSpent: 0,
    modules: [
      {
        moduleId: '1',
        percentComplete: 0
      },
      {
        moduleId: '2',
        percentComplete: 0
      },
      {
        moduleId: '3',
        percentComplete: 0
      }
    ]
  }
];
