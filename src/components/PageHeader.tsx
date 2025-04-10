import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

const PageHeader = ({ icon, title, description, iconBgColor, iconColor }: PageHeaderProps) => {
  return (
    <div className="mb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-4"
      >
        <div className={`${iconBgColor} p-4 rounded-full`}>
          <div className={`text-4xl ${iconColor}`}>{icon}</div>
        </div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold text-white mb-4"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-gray-400 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default PageHeader;
