interface SchemaType {
  id: string;
  createdAt: string;
  updatedAt: string;
}

type BlogStatus = "DRAFT" | "PUBLISHED" | "REJECTED";

type UserRole = "BASIC" | "ADMIN";

export interface Blog extends SchemaType {
  title: string;
  content: string;
  likes: number;
  author: User;
  approvedBy: User;
  banner: string;
  status: BlogStatus;
  comments: Comment[];
  likedBy: LikedPosts[];
}

export interface User extends SchemaType {
  role: UserRole;
  email: string;
  image: string;
  posts: Blog[];
  approvedPosts: Blog[];
  name: string;
  reputation_point: number;
  comments: Comment[];
  likedPosts: LikedPosts[];
}

export interface UserSession {
  id: string;
  role: UserRole;
  email: string;
  image: string;
  name: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  blog: Blog;
  blogId: string;
  author: User;
  authorId: string;
}

export interface LikedPosts {
  user: User;
  blog: Blog;
  createdAt: string;
}
