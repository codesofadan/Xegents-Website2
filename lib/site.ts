export const siteConfig = {
  name: "Xegents",
  tagline: "Your AI Transformation Partner",
  description:
    "Your team's already doing the work. AI just does it faster and cheaper. We identify where AI creates immediate ROI, then build those systems for you.",
  url: "https://xegents.com",
  email: "business.zainsaeed@gmail.com",
  phone: "+92 308 804 0606",
  // Mostly single-page navigation: the anchor items scroll to a section of the
  // home page and `id` is that section's DOM id, used for the anchor and for
  // scroll-spy. Items pointing at a real route are marked as such below.
  nav: [
    { label: "Services",    href: "/#services",        id: "services" },
    { label: "Affiliation", href: "/#parent-company",  id: "parent-company" },
    { label: "Work",        href: "/#work",            id: "work" },
    // Real route, not an anchor — scrollToSection finds no element with this
    // id and falls through to normal navigation.
    { label: "Free Tools",  href: "/lead-magnets",     id: "lead-magnets-page" },
  ],
  social: {
    youtube: "https://www.youtube.com/@zainsaeeed",
    instagram: "https://www.instagram.com/zainsaeeed/",
    facebook: "https://www.facebook.com/zainsaeeeed/",
    linkedin: "https://www.linkedin.com/in/zainsaeeed/",
    whatsapp: "https://wa.me/923088040606",
  },
}
