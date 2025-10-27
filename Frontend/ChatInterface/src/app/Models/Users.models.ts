export interface User {
  id: number;
  nom: String;
  prenom: String;
  username: String;
  email: String;
  imageUrl: String;
  users: User;
  followers: User;
}
