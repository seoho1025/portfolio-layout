export type CareerType = 'intern' | 'hackathon' | 'activity' | 'bootcamp';

export type CareerItem = {
  title: string;
  period: string;
  description: string;
};

export type Career = {
  type: CareerType;
  name: string;
  logo: string;
  period: string;
  quote: string;
  roles: string[];
  awardScale: string;
  items: CareerItem[];
};

