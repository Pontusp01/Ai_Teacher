
import React from 'react';

interface ModuleContentProps {
  courseId: string;
  currentModuleIndex: number;
  courseTitle: string;
  moduleTitle: string;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ 
  courseId, 
  currentModuleIndex,
  courseTitle,
  moduleTitle
}) => {
  if (courseId === 'course1' && currentModuleIndex === 3) {
    return (
      <div className="prose max-w-none mb-6">
        <h2>3.1 Process Theory Overview</h2>
        <p>In COPC standards, process theory forms the foundation of customer experience management. This module explores how processes are defined, measured, and improved.</p>
        
        <h3>Key Process Theory Concepts</h3>
        <ul>
          <li>A process is a set of activities that transforms inputs into outputs</li>
          <li>Every process should have clearly defined KPIs (Key Performance Indicators)</li>
          <li>Processes should be documented, standardized, and continuously improved</li>
          <li>COPC uses the PDCA (Plan-Do-Check-Act) cycle for process management</li>
        </ul>
        
        <h3>The Importance of Process Theory</h3>
        <p>Understanding process theory enables organizations to:</p>
        <ul>
          <li>Create consistent customer experiences</li>
          <li>Identify bottlenecks and inefficiencies</li>
          <li>Implement systematic improvements</li>
          <li>Establish clear accountability for results</li>
        </ul>
        
        <h3>Process Documentation</h3>
        <p>COPC requires comprehensive process documentation that includes:</p>
        <ul>
          <li>Process flowcharts</li>
          <li>Roles and responsibilities</li>
          <li>Input and output specifications</li>
          <li>KPIs and targets</li>
          <li>Control mechanisms</li>
        </ul>
      </div>
    );
  }
  
  return null;
};

export default ModuleContent;
