import { GrHomeOption } from "react-icons/gr";
import { FaFileAlt } from "react-icons/fa";
import { TbRouteAltLeft } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";

export const navLinks = [
    {
      label: "Accueil",
      route: "/",
      icon: <GrHomeOption size={24} />,
    },
    {
      label: "Journal d'évènements",
      route: "/logs",
      icon: <FaFileAlt size={24} />,
    },
    {
      label: "Requêtes",
      route: "/requests",
      icon: <TbRouteAltLeft size={24} />,
    },
    
    {
      label: "Paramètres",
      route: "/settings",
      icon: <IoSettings size={24} />,
    },
    
  ];