import { HorseListing } from "@/components/HorseListing";
import horseBlack from "@/assets/horse-black-stallion.jpg";

const Stallions = () => (
  <HorseListing
    category="stallions"
    titleKey="categories.stallions.title"
    subtitleKey="categories.stallions.subtitle"
    bannerImage={horseBlack}
  />
);

export default Stallions;
