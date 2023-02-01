type Campground = {
  _id: string;
  author: User;
  title: string;
  image: string;
  location: string;
  price: number;
  reviews: Review[];
  description: string;
  createdAt: string;
  updatedAt: string;
};

type CampgroundInput = Pick<
  Campground,
  'title' | 'image' | 'location' | 'price' | 'description'
>;
