import { ReactNode } from 'react';

export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    features: string[];
    component: ReactNode;
    hidden?: boolean;
}
