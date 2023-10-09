export interface Order {
  id: number;
  userId: number;
  orderStatusId: number;
  orderPaymentTypeId: number;
  orderNumber: number;
  createDate: Date;
  updateDate: Date;
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  createDate: Date;
  updateDate: Date;
}
