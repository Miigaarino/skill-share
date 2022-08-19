interface SchemaType {
  id: string;
  createdAt: string;
  updatedAt: string;
}

type BlogStatus = "DRAFT" | "PUBLISHED";

type UserRole = "BASIC" | "ADMIN";

export interface Blog extends SchemaType {
  title: string;
  content: string;
  likes: number;
  author: User;
  banner: string;
  status: BlogStatus;
}

export interface User extends SchemaType {
  role: UserRole;
  email: string;
  image: string;
  posts: Blog[];
  name: string;
  reputation_point: number;
}
