export type ServiceType = {
  id: string;
  name: string;
  price: number;
};

export type StoreType = {
  id: string;
  name: string;
  category: "barberia" | "nails";
  description: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
  schedule: string;
  services: ServiceType[];
};