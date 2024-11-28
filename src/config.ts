export const SITE = {
  title: "khriztianmoreno's Blog",
  description: "A blog about development and life, powered by Astro.",
  url: "https://blog.khriztianmoreno.dev",
  image:
    "https://res.cloudinary.com/khriztianmoreno/image/upload/v1591324325/KM-brand/card/kristian%20moreno-6_card-front%402x-assets/card-front.png",
  analytics: {
    umami: {
      id: "b6c5d775-fa71-4050-a2b5-dc2396a00cd8",
    },
  },
};

export const AUTHOR = {
  name: "khriztianmoreno",
  link: "https://github.com/khriztianmoreno",
  email: "khriztianmoreno@gmail.com",
  bio: "I help others learn by doing through articles, videos, and courses about Javascript, React, and the static web. #MDE, #MVP, #GDE & #AWSCommunity",
};

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/khriztianmoreno",
    linkTitle: `${AUTHOR.name} on Github`,
  },
  {
    name: "Email",
    href: `mailto:${AUTHOR.email}`,
    linkTitle: `Send an email to ${AUTHOR.name}`,
  },
];

export const MISC = {
  more: {
    marks: ["<!--more-->", "<!-- more -->"],
  },
  dateTag: {
    daysToBeGreen: 7,
    daysToBeRed: 365,
  },
  license: {
    enabled: true,
    default: {
      name: "MIT",
      link: "https://opensource.org/license/mit",
    },
  },
  toc: {
    minHeadings: 3,
  },
};
