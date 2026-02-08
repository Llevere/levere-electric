import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Schedule your electrical service appointment with Levere Electric in London, ON. Fast response, flexible scheduling.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book an Appointment | Levere Electric",
    description:
      "Schedule your electrical service appointment with Levere Electric in London, ON.",
    url: "/book",
  },
};

export default function Book() {
  return <div>Book page</div>;
}
