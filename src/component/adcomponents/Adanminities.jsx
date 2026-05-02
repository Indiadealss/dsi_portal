// components/Amenities.jsx
import irishPlatinumgall from '../../Images/irishPlatinumgall-3.jpg';
import irishPlatinumSportsArea from '../../Images/irishPlatinumSportsArea.jpeg';
import irishPlatinumgalls from '../../Images/irishPlatinumgall-2.jpg';
import irishPlatinumQuestion from '../../Images/irishPlatinumQuestion.jpg';
import Dayview from '../../Images/DayView.png';
import { Tag, Home, Building2 } from 'lucide-react';
import { Bed, Utensils, Sofa, DoorOpen, Paintbrush } from 'lucide-react';


const specs = [
  {
    title: "Master Bedroom",
    detail: "Laminated wooden flooring",
    icon: Bed,
  },
  {
    title: "Bedrooms",
    detail: "Vitrified tile flooring",
    icon: Bed,
  },
  {
    title: "Kitchen",
    detail: "Anti-skid vitrified tile flooring",
    icon: Utensils,
  },
  {
    title: "Living & Dining",
    detail: "Vitrified tile flooring",
    icon: Sofa,
  },
  {
    title: "Balcony",
    detail: "Anti-skid vitrified flooring",
    icon: DoorOpen,
  },
  {
    title: "External Finish",
    detail: "Quartz reinforced textured paint",
    icon: Paintbrush,
  },
];


const amenities = [
  {
    title: "Infinity Pool & Jacuzzi",
    description: "Experience world-class leisure with infinity pool, jacuzzi, floating cabana, and lily pond for ultimate relaxation.",
    image: irishPlatinumgall, // Replace with your image paths
  },
  {
    title: "Sports Arena",
    description: "Stay active with lawn tennis, badminton, basketball, skating rink, and box cricket facilities.",
    image: irishPlatinumSportsArea,
  },
  {
    title: "Wellness & Gardens",
    description: "Rejuvenate in reflexology, butterfly, theme & urban gardens with dedicated wellness and meditation zones.",
    image: irishPlatinumgalls,
  }
];

const highlights = [
  { text: "11 ft high ceilings", sub: " offering enhanced space and luxury feel" },
  { text: "8 ft wide balconies", sub: "enjoy a terrace-like experience" },
  { text: "MI-VAN Construction", sub: "" },
  { text: "Low-Density Living", sub: "with Park Facing & Road Facing Units" },
  { text: "High Rise Apartments", sub: "up to 29 Floors" },
];


export default function Adanminities({setCustomEnquiry}) {
  return (
    <section className="bg-[#0f172a] pt-20 ">
     


    </section>
  );
}