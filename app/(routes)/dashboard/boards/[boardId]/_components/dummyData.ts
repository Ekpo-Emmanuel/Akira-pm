import { Group, Column, Row, StatusOption, PriorityOption, LabelOption } from '@/app/types';

export const statusOptions: StatusOption[] = [
  { id: 'inProgress', name: 'In Progress', color: '#F7BC63' }, 
  { id: 'completed', name: 'Completed', color: '#62D491' },    
  { id: 'pending', name: 'Pending', color: '#206EDF' },        
  { id: 'notStarted', name: 'Not Started', color: '#797E93' },        
]; 

export const priorityOptions: PriorityOption[] = [
  { id: 'low', name: 'Low', color: '#62D491' },
  { id: 'medium', name: 'Medium', color: '#F7BC63' },
  { id: 'high', name: 'High', color: '#FF6B6B' },
];

export const labelOptions: LabelOption[] = [
  { id: 'frontend', name: 'Frontend', color: '#FFD700' },
  { id: 'backend', name: 'Backend', color: '#1E90FF' },
  { id: 'bug', name: 'Bug', color: '#FF4500' },
  { id: 'feature', name: 'Feature', color: '#32CD32' },
];

export const dummyData: Group[] = [
  {
    id: '1',
    name: 'Development Tasks',
    columns: [
      { id: 'task', name: 'Task', type: 'text' },
      { 
        id: 'status', 
        name: 'Status', 
        type: 'status',
        options: statusOptions 
      },
      { id: 'dueDate', name: 'Due Date', type: 'date' },
      { id: 'assignees', name: 'Assignees', type: 'people' },
      { id: 'priority', name: 'Priority', type: 'priority', options: priorityOptions },
      { id: 'labels', name: 'Labels', type: 'label', options: labelOptions },
      { id: 'checkboxGroup', name: 'Checkbox Group', type: 'checkbox_group'},
      { id: 'dateTimeline', name: 'Date Timeline', type: 'date_timeline' },
      // Add more columns as needed
    ],
    rows: [
      { 
        id: '1', 
        task: 'Implement login', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-05-30', 
        assignees: ['John', 'Jane'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[0], labelOptions[2]], // Frontend, Bug
        checkboxGroup: ['Option 1', 'Option 3'],
        dateTimeline: { start: '', end: '' },
      }, 
      { 
        id: '2', 
        task: 'Design database schema', 
        status: statusOptions[3], // Not Started
        dueDate: '2024-05-15', 
        assignees: ['Jane'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[1]], // Backend
        checkboxGroup: [],
        dateTimeline: { start: '2024-05-10', end: '2024-05-20' },
      },
      { 
        id: '3', 
        task: 'Setup CI/CD pipeline', 
        status: statusOptions[1], // Completed
        dueDate: '2024-06-05', 
        assignees: ['Mark'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[1], labelOptions[3]], // Backend, Feature
        checkboxGroup: ['Option 1'],
        dateTimeline: { start: '2024-06-01', end: '2024-06-10' },
      },
      { 
        id: '4', 
        task: 'Write unit tests for API', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-06-15', 
        assignees: ['Jane', 'Alex'],
        priority: priorityOptions[0], // Low
        labels: [labelOptions[1], labelOptions[2]], // Backend, Bug
        checkboxGroup: ['Option 2'],
        dateTimeline: { start: '2024-06-10', end: '2024-06-20' },
      },
      { 
        id: '5', 
        task: 'Create landing page', 
        status: statusOptions[3], // Not Started
        dueDate: '2024-07-01', 
        assignees: ['Wendy'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[0]], // Frontend
        checkboxGroup: ['Option 3'],
        dateTimeline: { start: '2024-06-25', end: '2024-07-05' },
      },
      { 
        id: '6', 
        task: 'Configure server monitoring', 
        status: statusOptions[2], // Pending
        dueDate: '2024-07-05', 
        assignees: ['John'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[3]], // Feature
        checkboxGroup: ['Option 1'],
        dateTimeline: { start: '2024-07-01', end: '2024-07-10' },
      },
      { 
        id: '7', 
        task: 'Fix login redirect bug', 
        status: statusOptions[1], // Completed
        dueDate: '2024-06-20', 
        assignees: ['Alex'],
        priority: priorityOptions[0], // Low
        labels: [labelOptions[2]], // Bug
        checkboxGroup: [],
        dateTimeline: { start: '2024-06-18', end: '2024-06-21' },
      },
      { 
        id: '8', 
        task: 'Implement OAuth2.0 integration', 
        status: statusOptions[3], // Not Started
        dueDate: '2024-08-01', 
        assignees: ['Wendy'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[1], labelOptions[3]], // Backend, Feature
        checkboxGroup: ['Option 1', 'Option 2'],
        dateTimeline: { start: '2024-07-20', end: '2024-08-05' },
      },
      { 
        id: '9', 
        task: 'Create user dashboard UI', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-08-10', 
        assignees: ['John', 'Jane'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[0], labelOptions[3]], // Frontend, Feature
        checkboxGroup: ['Option 3'],
        dateTimeline: { start: '2024-08-05', end: '2024-08-15' },
      },
      { 
        id: '10', 
        task: 'Optimize database queries', 
        status: statusOptions[1], // Completed
        dueDate: '2024-09-01', 
        assignees: ['Mark'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[1]], // Backend
        checkboxGroup: [],
        dateTimeline: { start: '2024-08-25', end: '2024-09-05' },
      },
      { 
        id: '11', 
        task: 'Implement API rate limiting', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-09-10', 
        assignees: ['Alex'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[1], labelOptions[3]], // Backend, Feature
        checkboxGroup: ['Option 2'],
        dateTimeline: { start: '2024-09-01', end: '2024-09-15' },
      },
      { 
        id: '12', 
        task: 'Implement real-time notifications', 
        status: statusOptions[2], // Pending
        dueDate: '2024-09-15', 
        assignees: ['Jane'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[0], labelOptions[3]], // Frontend, Feature
        checkboxGroup: ['Option 3'],
        dateTimeline: { start: '2024-09-10', end: '2024-09-20' },
      },
      { 
        id: '25', 
        task: 'Conduct security audit', 
        status: statusOptions[2], // Pending
        dueDate: '2024-12-15', 
        assignees: ['Wendy'],
        priority: priorityOptions[0], // Low
        labels: [labelOptions[3]], // Feature
        checkboxGroup: ['Option 2'],
        dateTimeline: { start: '2024-12-01', end: '2024-12-31' },
      },
      {
        id: '26', 
        task: 'Update documentation', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-10-01', 
        assignees: ['John'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[1]], // Backend
        checkboxGroup: ['Option 1'],
        dateTimeline: { start: '2024-09-25', end: '2024-10-05' },
      },
      {
        id: '27', 
        task: 'Implement caching', 
        status: statusOptions[3], // Not Started
        dueDate: '2024-10-15', 
        assignees: ['Jane'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[1], labelOptions[3]], // Backend, Feature
        checkboxGroup: ['Option 2'],
        dateTimeline: { start: '2024-10-10', end: '2024-10-20' },
      },
      {
        id: '28', 
        task: 'Conduct performance testing', 
        status: statusOptions[2], // Pending
        dueDate: '2024-11-01', 
        assignees: ['Alex'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[1], labelOptions[3]], // Backend, Feature
        checkboxGroup: ['Option 3'],
        dateTimeline: { start: '2024-10-25', end: '2024-11-05' },
      },
      {
        id: '29', 
        task: 'Improve user authentication', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-11-15', 
        assignees: ['Wendy'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[0], labelOptions[3]], // Frontend, Feature
        checkboxGroup: ['Option 1', 'Option 2'],
        dateTimeline: { start: '2024-11-10', end: '2024-11-20' },
      },
      {
        id: '30', 
        task: 'Update documentation', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-10-01', 
        assignees: ['John'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[1]], // Backend
        checkboxGroup: ['Option 1'],
        dateTimeline: { start: '2024-09-25', end: '2024-10-05' },
      },
      {
        id: '31', 
        task: 'Implement caching', 
        status: statusOptions[3], // Not Started
        dueDate: '2024-10-15', 
        assignees: ['Jane'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[1], labelOptions[3]], // Backend, Feature
        checkboxGroup: ['Option 2'],
        dateTimeline: { start: '2024-10-10', end: '2024-10-20' },
      },
      {
        id: '32', 
        task: 'Conduct performance testing', 
        status: statusOptions[2], // Pending
        dueDate: '2024-11-01', 
        assignees: ['Alex'],
        priority: priorityOptions[1], // Medium
        labels: [labelOptions[1], labelOptions[3]], // Backend, Feature
        checkboxGroup: ['Option 3'],
        dateTimeline: { start: '2024-10-25', end: '2024-11-05' },
      },
      {
        id: '33', 
        task: 'Improve user authentication', 
        status: statusOptions[0], // In Progress
        dueDate: '2024-11-15', 
        assignees: ['Wendy'],
        priority: priorityOptions[2], // High
        labels: [labelOptions[0], labelOptions[3]], // Frontend, Feature
        checkboxGroup: ['Option 1', 'Option 2'],
        dateTimeline: { start: '2024-11-10', end: '2024-11-20' },
      },
    ],
  },
];
