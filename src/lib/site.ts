// Centralized site configuration.
export const SITE = {
  whatsappNumber: "+96103956004", // used for wa.me links
  phone: "03956004",
  email: "Mazloum01@aol.com",
  address: "RV4R+68C, Saadnayel, Lebanon",
  mapUrl:
    "https://www.google.com/maps?q=Al+Mazloum+Stud,+Saadnayel,+Lebanon&output=embed",
  mapsLink: "https://maps.app.goo.gl/b44jssDxSBV4gt1G9",
  social: {
    facebook: "https://www.facebook.com/share/17vk29DxDw/",
  },
};

export function whatsappLink(message: string, number: string = SITE.whatsappNumber) {
  const cleaned = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
