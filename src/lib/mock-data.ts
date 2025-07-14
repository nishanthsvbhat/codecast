import type { CodeAlert } from './types';

export const initialCodes: CodeAlert[] = [
  {
    id: '1',
    code: 'Code Blue',
    type: 'Cardiac Arrest',
    location: 'Room 304, West Wing',
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    acknowledged: false,
  },
  {
    id: '2',
    code: 'Code Red',
    type: 'Fire Alarm',
    location: 'Cafeteria, Main Building',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    acknowledged: false,
  },
  {
    id: '3',
    code: 'Code Pink',
    type: 'Infant Abduction',
    location: 'Maternity Ward, 2nd Floor',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    acknowledged: true,
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: '4',
    code: 'Code Silver',
    type: 'Active Shooter',
    location: 'Emergency Department Entrance',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    acknowledged: true,
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: '5',
    code: 'Code Black',
    type: 'Bomb Threat',
    location: 'Main Lobby',
    timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    acknowledged: false,
  },
];
