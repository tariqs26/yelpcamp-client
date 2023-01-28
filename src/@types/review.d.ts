type Review = {
  _id: string;
  author: User;
  rating: number;
  body: string;
};

type ReviewInput = Omit<Review, '_id' | 'author'>;
