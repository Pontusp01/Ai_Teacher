
export interface Document {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  category: string;
  starred: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
