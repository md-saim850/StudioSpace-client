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
    status?:string
  }
}


export interface CategoryType{
  _id:string;
  name:string;
  slug:string;
  description:string;
  icon:string;
  isActive:boolean;
  image:string;
  count:number;
}

export interface Studio {
  _id: string;
  title: string;
  image: string;
  hourlyRate: number | string;
}

export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export interface Booking {
  _id: string;
  studio: Studio;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
}

export interface ListingData {
  title: string;
  image: string;
  dateTime: string;
  hourlyRate: number | string;
}

export interface Listing {
  _id: string;
  data: ListingData;
}
