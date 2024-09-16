import { User, Building2, Laptop, Globe, Github } from "lucide-react";

export const DOCK_DATA = [
  { Icon: User, tooltip: "About me" },
  { Icon: Building2, tooltip: "Work Experience" },
  { Icon: Laptop, tooltip: "Projects" },
];

export const PROJECTS = [
  {
    title: "Study Mate",
    href: "https://study-mate-hacked.vercel.app/",
    dates: "Jan 2024 - Jan 2024",
    active: true,
    description:
      "Hackathon project - An AI classroom helper aimed at aiding students with ADHD to be more focused and organized in the classroom. Uses AI to scan and correct notes.",
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "DrizzleORM",
      "TailwindCSS",
      "Open AI SDK",
      "Shadcn UI",
    ],
    links: [
      {
        type: "Website",
        href: "https://study-mate-hacked.vercel.app/",
        icon: <Globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/1pharaxh/StudyMate",
        icon: <Github className="size-3" />,
      },
    ],
    image: "/images/study_mate.png",
    video: "",
  },
  {
    title: "Scale Platform",
    href: "https://scale-platform-401.vercel.app/",
    dates: "Jan 2024 - April 2024",
    active: true,
    description:
      "[Developed SCALE](https://scale-platform-401.vercel.app/), a platform empowering community organizations with project management and social impact reporting. Features include data interfacing, real-time collaboration, and scalability, enhancing efficiency and transparency.",
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "DrizzleORM",
      "TailwindCSS",
      "Shadcn UI",
    ],
    links: [
      {
        type: "Website",
        href: "https://scale-platform-401.vercel.app/",
        icon: <Globe className="size-3" />,
      },
    ],
    image: "/images/scale.png",
    video: "",
  },
  {
    title: "Anubhava",
    href: "https://github.com/1pharaxh/ignite",
    dates: "Feb 2023 - April 2023",
    active: true,
    description:
      "Developed a job board web app for an Indian college, implementing a REST API with Node.js and Express.js, managing user authentication and data storage with Firebase, and designing a responsive UI with React.js and Tailwind CSS, handling over 20,000 concurrent users.",
    technologies: [
      "React.js",
      "Express.js",
      "TailwindCSS",
      "MongoDB",
      "Firebase",
      "Node.js",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/1pharaxh/ignite",
        icon: <Github className="size-3" />,
      },
    ],
    image:
      "https://user-images.githubusercontent.com/93630550/234092935-63c5a587-77d1-4e91-bfa5-84d327ce8fab.png",
    video: "",
  },

  {
    title: "QR Go",
    href: "https://github.com/CMPUT301W23T10/QRgo",
    dates: "Jan 2023 - April 2023",
    active: true,
    description:
      "Developed an Android app for scanning QR codes as Pokemons and battling other users. Implemented UI with Android Studio and Java, wrote tests with JUnit and Mockito, set up CI/CD with GitHub Actions, and used Firebase for data storage.",
    technologies: ["Android Studio", "Gradle", "Java", "Firebase", "JUnit"],
    links: [
      {
        type: "Source",
        href: "https://github.com/CMPUT301W23T10/QRgo",
        icon: <Github className="size-3" />,
      },
    ],
    image:
      "https://user-images.githubusercontent.com/93630550/227075457-fa87080e-7a22-4506-bddc-c62815870a1e.png",
    video: "",
  },
];
