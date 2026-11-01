export interface StudioType {
  _id: string;
  id?:string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  amenities: string[];
  overview: string;
  ownerName?: string;
  ownerEmail?: string;
  rating?: number;
  reviewCount?: number;
  dateTime?:string
  status?:string
}