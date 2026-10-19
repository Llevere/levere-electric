export type ServiceItem = {
  title: string;
  /** One or two sentences, shown on the card and in the ItemList schema. */
  description: string;
  /** Internal page for the service, or /book when there is no dedicated page. */
  href: string;
  /** Jobber request form for this kind of work. */
  quote: string;
  /** File name in the Vercel Blob `services/` or `home/` folder. */
  key?: string;
  /** Local image under /public, used instead of `key` when set. */
  src?: string;
  duration?: string;
  estimate?: string;
};
