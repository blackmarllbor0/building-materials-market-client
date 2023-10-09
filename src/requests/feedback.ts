import { api, OffsetLimit } from 'boot/axios';
import { Feedback } from 'stores/feedbacks';

export interface FeedbacksParam {
  userId?: number;
  productId?: number;
  rating?: number;
  offsetLimit?: OffsetLimit;
}

const path = '/feedback';

export const useFeedbackRequest = () => ({
  async getAll({ offsetLimit, ...params }: FeedbacksParam) {
    const { data } = await api.get(path, {
      params: {
        ...offsetLimit, ...params,
      },
    });

    return data as Feedback[];
  },
});
