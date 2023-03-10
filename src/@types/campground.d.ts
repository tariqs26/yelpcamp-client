type Campground = {
  _id: string;
  author: AppUser;
  title: string;
  image: string;
  location: string;
  price: number;
  reviews: Review[];
  description: string;
  createdAt: string;
  updatedAt: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

type CampgroundInput = Pick<
  Campground,
  'title' | 'image' | 'location' | 'price' | 'description'
>;

type CampgroundsData =
  | {
      pageParams?: unknown[];
      pages?: { campgrounds: Pick<Campground, '_id'>[]; totalPages: number }[];
    }
  | undefined;
