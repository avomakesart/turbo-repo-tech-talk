export interface SectionItems {
  name: string;
  href: string;
}

export interface Sections {
  id: string;
  name: string;
  items: SectionItems[];
}

export interface FeaturedProduct {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Categories {
  id: string;
  name: string;
  featured: FeaturedProduct[];
  sections: Sections[];
}

export interface Pages {
  name: string;
  href: string;
}

export interface Navigation {
  categories: Categories[];
  pages: Pages[];
}
