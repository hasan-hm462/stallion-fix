import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  to: string;
  image: string;
  title: string;
  subtitle: string;
  index?: number;
}

export const CategoryCard = ({ to, image, title, subtitle, index = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        to={to}
        className="relative block overflow-hidden rounded-md aspect-[3/4] shadow-luxury"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-luxury duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-luxury rounded-md" />

        <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
          <span className="gold-divider mb-4 block w-10" />
          <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-primary-foreground/80 leading-relaxed line-clamp-2">
            {subtitle}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold font-medium tracking-wide">
            <span>Discover</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
