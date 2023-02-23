import axios, { isAxiosError } from 'axios';
import { ErrorDetails } from '../@types/Error';

const campgroundsAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/campgrounds`,
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

export const fetchCampgrounds = async (): Promise<Campground[]> =>
  (await campgroundsAPI.get('/')).data;

export const fetchCampgroundById = async (
  id: string
): Promise<Campground | AppError> => {
  try {
    return (await campgroundsAPI.get(`/${id}`)).data;
  } catch (err) {
    return isAxiosError(err) && err.code === 'SERVER_ERROR'
      ? {
          message: err.message,
          details: ErrorDetails.SERVER_ERROR,
        }
      : {
          message: 'Campground not Found',
          details: ErrorDetails.NOT_FOUND,
          link: {
            url: '/campgrounds',
            text: 'Go to Campgrounds',
          },
        };
  }
};
export const createCampground = async (
  campground: CampgroundInput
): Promise<Campground> => (await campgroundsAPI.post('/', campground)).data;

export const updateCampground = async ({
  id,
  campground,
}: {
  id: string;
  campground: CampgroundInput;
}) => await campgroundsAPI.put(`/${id}`, campground);

export const deleteCampground = async (id: string) =>
  await campgroundsAPI.delete(`/${id}`);

export default campgroundsAPI;
