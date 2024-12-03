export interface Professional {
  id: string;
  name: string;
  email: string;
  profession: ProfessionType;
  phoneNumber: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: 'professional' | 'admin';
}

export type ProfessionType = 
  | 'Barber'
  | 'Plumber'
  | 'Electrician'
  | 'Carpenter'
  | 'Mechanic'
  | 'Painter'
  | 'Shopkeeper';

export const PROFESSIONS: ProfessionType[] = [
  'Barber',
  'Plumber',
  'Electrician',
  'Carpenter',
  'Mechanic',
  'Painter',
  'Shopkeeper'
];