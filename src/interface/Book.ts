export default interface Book {
  [x: string]: any;
  _id: string;
  title: string;
  description: string;
  publishDate: Date;
  coverImage: string;
  pageCount: number;
  language: string;
  categories: string[];
  price: number;
  stock: number;
}
