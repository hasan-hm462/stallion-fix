// Centralized site configuration.
export const SITE = {
  whatsappNumber: "+96103956004", // used for wa.me links
  phone: "03956004",
  email: "Mazloum01@aol.com",
  address: "Al Mazloum Stud — Region · Country",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108858.07!2d36.20!3d33.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzM2LjAiTiAzNsKwMTInMDAuMCJF!5e0!3m2!1sen!2s!4v1700000000000",
  social: {
    facebook: "https://www.facebook.com/share/17vk29DxDw/",
  },
};

export function whatsappLink(message: string, number: string = SITE.whatsappNumber) {
  const cleaned = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
