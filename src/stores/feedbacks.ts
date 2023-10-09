export interface Feedback {
  id: number;
  userId: number;
  productId: number;
  companyId: number;
  rating: number;
  title: string;
  message: string;
  createDate: Date;
  updateDate: Date;
}
