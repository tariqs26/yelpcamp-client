type Review = {
  _id: string;
  author: AppUser;
  rating: number;
  body: string;
};

type ReviewInput = Omit<Review, '_id' | 'author'>;
