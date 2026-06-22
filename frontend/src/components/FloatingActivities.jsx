import { motion } from "framer-motion";

import astronaut from "../assets/Astronaut.svg";
import telescope from "../assets/Telescope.svg"

const activities = [
  {
    image: astronaut,
    top: "15%",
    left: "8%",
  },
 
  {
    image: telescope,
    top: "60%",
    right: "10%",
  },
];

const FloatingActivities = () => {
  return (
    <>
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: activity.top,
            left: activity.left,
            right: activity.right,
          }}
          animate={{
            y: [-15, 15, -15],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
          }}
        >
          <img
            src={activity.image}
            alt="activity"
            className="
              w-24
              md:w-32
              lg:w-40
              opacity-90
              pointer-events-none
              select-none
            "
          />
        </motion.div>
      ))}
    </>
  );
};

export default FloatingActivities;