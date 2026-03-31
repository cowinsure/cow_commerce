import { motion } from "framer-motion";

interface SectionHeadingProps {
  heading: string;
}

const SectionMiniHeading = ({ heading }: SectionHeadingProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="inline-flex items-center gap-3 text-primary-fixed font-semibold tracking-widest text-xs uppercase mb-4"
    >
      <span className="w-12 h-0.5 bg-primary-fixed" />
      {heading}
      {/* <span className="w-12 h-0.5 bg-primary-fixed" /> */}
    </motion.span>
  );
};

export default SectionMiniHeading;
