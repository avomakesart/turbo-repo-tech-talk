export interface BreadCrumb {
  id: number;
  name: string;
  href: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Color {
  name: string;
  class: string;
  selectedClass: string;
}

export interface Size {
  name: string;
  inStock: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  href: string;
  breadcrumbs: BreadCrumb[];
  images: Image[];
  colors: Color[];
  sizes: Size[];
  description: string;
  highlights: string[];
  details: string;
  imageSrc?: string;
  imageAlt?: string;
  quantity?: number;
  amount?: number;
}

export interface ProductReviews {
  href: string;
  average: number;
  totalCount: number;
}
