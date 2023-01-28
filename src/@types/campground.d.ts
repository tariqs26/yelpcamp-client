type Campground = {
  _id: string;
  author: User;
  title: string;
  image: string;
  location: string;
  price: number;
  reviews: Review[];
  description: string;
};

type CampgroundInput = Omit<Campground, '_id' | 'reviews' | 'author'>;
