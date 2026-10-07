export type ServiceCardType = {
  title: string;
  description: string;
  /** Internal page describing the service (passes link equity, crawlable). */
  learnHref: string;
  /** External quote request (Jobber). */
  href: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};
