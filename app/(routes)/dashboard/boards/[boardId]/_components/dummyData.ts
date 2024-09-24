import { Group, Column, Row } from '@/app/types';

export const statusOptions = [
  { id: 'inProgress', name: 'In Progress', color: '#F7BC63' }, 
  { id: 'completed', name: 'Completed', color: '#62D491' },    
  { id: 'pending', name: 'Pending', color: '#206EDF' },        
  { id: 'notStarted', name: 'Not Started', color: '#797E93' },        
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
        type: 'select',
        options: statusOptions 
      },
      { id: 'dueDate', name: 'Due Date', type: 'date' },
      { id: 'assignee', name: 'Assignee', type: 'multiselect' },  // Change the type to 'multiselect'
    ],
    rows: [
      { id: '1', task: 'Implement login', status: statusOptions[0], dueDate: '2024-05-30', assignees: ['John', 'Jane'] }, 
      { id: '2', task: 'Design database schema', status: statusOptions[4], dueDate: '', assignees: ['Jane'] },
      { id: '3', task: 'Set up CI/CD pipeline', status: statusOptions[2], dueDate: '2024-06-10', assignees: ['Alice'] },
      { id: '4', task: 'Develop user profile page', status: statusOptions[0], dueDate: '2024-06-20', assignees: ['Bob', 'Charlie'] }, 
      { id: '5', task: 'Optimize API performance', status: statusOptions[2], dueDate: '2024-07-05', assignees: ['Charlie', 'Diana', 'Emma', 'James','Charlie', 'Diana', 'Emma', 'James'] },
      { id: '6', task: 'Implement password reset', status: statusOptions[0], dueDate: '2024-07-15', assignees: [] },
      { id: '7', task: 'Create unit tests', status: statusOptions[2], dueDate: '2024-07-25', assignees: ['Ethan'] },
      { id: '8', task: 'Integrate third-party APIs', status: statusOptions[1], dueDate: '2024-06-05', assignees: ['Fiona'] },
      { id: '9', task: 'Refactor legacy code', status: statusOptions[0], dueDate: '2024-08-01', assignees: ['George'] },
      { id: '10', task: 'Implement search functionality', status: statusOptions[2], dueDate: '2024-08-15', assignees: ['Hannah'] },
      { id: '11', task: 'Set up monitoring tools', status: statusOptions[0], dueDate: '2024-08-25', assignees: ['Ian'] },
      { id: '12', task: 'Develop mobile-responsive design', status: statusOptions[2], dueDate: '2024-09-05', assignees: ['Jasmine'] },
      { id: '13', task: 'Implement notifications', status: statusOptions[0], dueDate: '2024-09-15', assignees: ['Kevin'] },
      { id: '14', task: 'Conduct code reviews', status: statusOptions[1], dueDate: '2024-07-20', assignees: ['Laura'] },
      { id: '15', task: 'Update documentation', status: statusOptions[2], dueDate: '2024-09-25', assignees: ['Michael'] },
      { id: '16', task: 'Integrate payment gateway', status: statusOptions[0], dueDate: '2024-10-05', assignees: ['Nina'] },
      { id: '17', task: 'Set up staging environment', status: statusOptions[1], dueDate: '2024-08-10', assignees: ['Oscar'] },
      { id: '18', task: 'Implement data encryption', status: statusOptions[2], dueDate: '2024-10-15', assignees: ['Paula'] },
      { id: '19', task: 'Develop admin dashboard', status: statusOptions[0], dueDate: '2024-10-25', assignees: ['Quentin'] },
      { id: '20', task: 'Optimize image loading', status: statusOptions[2], dueDate: '2024-11-05', assignees: ['Rachel'] },
      { id: '21', task: 'Implement user analytics', status: statusOptions[0], dueDate: '2024-11-15', assignees: ['Sam'] },
      { id: '22', task: 'Set up automated backups', status: statusOptions[1], dueDate: '2024-09-10', assignees: ['Tina'] },
      { id: '23', task: 'Develop chat feature', status: statusOptions[2], dueDate: '2024-11-25', assignees: ['Uma'] },
      { id: '24', task: 'Integrate social media logins', status: statusOptions[0], dueDate: '2024-12-05', assignees: ['Victor'] },
      { id: '25', task: 'Conduct security audit', status: statusOptions[2], dueDate: '2024-12-15', assignees: ['Wendy'] },
    ],
  },
];