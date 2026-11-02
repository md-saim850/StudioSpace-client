export interface StudioType {
  _id: string;
  ownerName?: string;
  ownerEmail?: string;
  data:{
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
    rating?: number;
    reviewCount?: number;
    dateTime?:string
    status?:string
  }
}


export interface CategoryType{
  id:string;
  name:string;
  slug:string;
  description:string;
  icon:string;
  isActive:string;
  image:string;
  count:number;
}