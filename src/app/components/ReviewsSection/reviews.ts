interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Glen R.",
    rating: 5,
    date: "2025-10-07",
    text:
      "We were referred to Levere Electric by a friend of ours.\n" +
      "Brandon gave us a suitable quote and we agreed. He arrived as scheduled. Friendly , enthusiastic and got right to work ! We had big jobs and small jobs , indoors and outdoors. Brandon completed everything that day !\n" +
      "We are very impressed with his professionalism and attention to detail.\n" +
      "We are extremely happy customers !",
  },
  {
    name: "Doreen W.",
    rating: 5,
    date: "2025-10-07",
    text: "Brandon was quick to respond to our inquiry and within a few days was able to come out to do the work required. He was very friendly and explained what he was going to do and did so in a timely manner. Would highly recommend his services.",
  },
  {
    name: "Jessica Keats",
    rating: 5,
    date: "2026-01-17",
    text: "Brandon is nothing short than fantastic. Called him yesterday eve after as we were having electrical issues over 1/2 the house and heard crackling in the panel. He was here in 20 mins. He diagnosed the issue quick but needed hydro to disconnect. He arranged everything and was here in the morning to replace the main breaker and the panel, he also fixed some prior work in the panel that he saw was wired wrong. Very customer centric let us know everything he was doing provided a fair quote and we were up and running in a few hours. I would highly recommend Levere Electric for any electrical issues, concerns or updates. Thanks Brandon!",
  },
];
