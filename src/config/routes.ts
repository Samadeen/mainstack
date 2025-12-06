import homeIcon from '../assets/home.svg';
import chartIcon from '../assets/chart.svg';
import paymentsIcon from '../assets/payments.svg';
import crmIcon from '../assets/crm.svg';
import appsIcon from '../assets/apps.svg';
import { RouteConfig } from '../types/routes.types';

export const routes: RouteConfig[] = [
  {
    name: 'Home',
    image: homeIcon,
    route: '/',
  },
  {
    name: 'Analytics',
    image: chartIcon,
    route: '/analytics',
  },
  {
    name: 'Revenue',
    image: paymentsIcon,
    route: '/revenue',
  },
  {
    name: 'CRM',
    image: crmIcon,
    route: '/crm',
  },
  {
    name: 'Apps',
    image: appsIcon,
    route: '/apps',
  },
];
