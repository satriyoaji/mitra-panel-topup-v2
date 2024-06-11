export interface ICategoryForm {
  key: string;
  value: string;
}

export interface ITransactionCreate {
  category_key: string;
  product_key: string;
  payment_method: string;
  payment_chanel: string;
  email: string;
  phone: string;
  form_data?: ICategoryForm[];
}
