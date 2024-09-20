import { Video, MessageCircle, UserCheck, Cpu, Code, Users } from "lucide-react";
import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#Features" },
  { label: "Workflow", href: "#Workflow" },
  { label: "Testimonials", href: "#Testimonials" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "SE Factory",
    image: user1,
    text: "The AI-assisted tutoring and collaborative coding features in VClass AI are simply amazing. This is the future of learning.",
  },
  {
    user: "Sarah Johnson",
    company: "Edutech Labs",
    image: user2,
    text: "Using VClass AI has transformed how we teach. Real-time chat and screen sharing make online lessons interactive and engaging.",
  },
  {
    user: "Michael Davis",
    company: "NextGen School",
    image: user3,
    text: "The collaborative coding environment in VClass AI helps my students learn faster. I can review their code and give permissions in real-time.",
  },
  {
    user: "Emily Stone",
    company: "FutureLearn",
    image: user4,
    text: "AI-powered assistance in the classroom is a game changer. It helps me deliver personalized learning at scale.",
  },
  {
    user: "John Smith",
    company: "Teach4U",
    image: user5,
    text: "With VClass AI, our remote lessons feel as effective as in-person sessions, thanks to seamless live chat, video meetings, and screen sharing.",
  },
  {
    user: "Liam Brown",
    company: "TechUni",
    image: user6,
    text: "The integration of AI in video lessons and collaborative coding has made learning fun and highly productive for my team.",
  },
];

export const features = [
  {
    icon: <Video />,
    text: "Google Meet Integration",
    description:
      "Host live video and audio sessions for each class with screen sharing and recording capabilities. Stay connected with your students in real-time.",
  },
  {
    icon: <MessageCircle />,
    text: "Live Class Chat",
    description:
      "Enable live chat for every class to foster communication. Students can engage with each other and the teacher while attending virtual lessons.",
  },
  {
    icon: <Cpu />,
    text: "AI-Powered Assistance",
    description:
      "Provide real-time AI tutoring to assist students with personalized help during class and even during video calls.",
  },
  {
    icon: <Code />,
    text: "Collaborative Compiler",
    description:
      "Work together on coding exercises with a shared compiler. Admins can give permission to students for live coding, while others can view the process.",
  },
  {
    icon: <UserCheck />,
    text: "Admin Control and Permissions",
    description:
      "Admins can control permissions for students, allowing them to collaborate, view, or edit during class activities like coding.",
  },
  {
    icon: <Users />,
    text: "Chrome Extension for Summaries",
    description:
      "A Chrome extension that summarizes live chat and important messages to provide students and teachers with quick summaries of class interactions.",
  },
];

export const checklistItems = [
  {
    title: "Seamless Video Integration",
    description:
      "Host meetings with Google Meet-like functionality, supporting video/audio communication and screen sharing in real-time.",
  },
  {
    title: "AI Assistance in Real-Time",
    description:
      "Students can ask questions and get responses from the AI, helping them during the session to solve problems or clarify concepts.",
  },
  {
    title: "Collaborative Code Environment",
    description:
      "The instructor can grant permissions to students to collaborate on code in real-time. Watch students work and provide feedback live.",
  },
  {
    title: "Chat Summaries via Chrome Extension",
    description:
      "Automatically summarize chat conversations, making it easier to review important points after each session.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Google Meet integration",
      "Classroom chat",
      "5 GB Storage",
      "Basic AI assistance",
    ],
  },
  {
    title: "Pro",
    price: "$25",
    features: [
      "Google Meet integration",
      "Advanced AI assistance",
      "10 GB Storage",
      "Collaborative coding",
      "Chat summaries",
    ],
  },
  {
    title: "Enterprise",
    price: "$150",
    features: [
      "Google Meet integration",
      "Full AI tutoring",
      "Unlimited Storage",
      "Full collaborative coding control",
      "Detailed analytics & insights",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Workshops" },
  { href: "#", text: "Job Board" },
];
