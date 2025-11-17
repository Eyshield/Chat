export interface User {
  id: number;
  nom: string;
  prenom: string;
  username: string;
  email: string;
  imageUrl: string;
  users: User;
  followers: User;
  followed?: boolean;
}
