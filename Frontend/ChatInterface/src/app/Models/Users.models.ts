export interface users {
  id: number;
  nom: String;
  prenom: String;
  username: String;
  email: String;
  imageUrl: String;
  users: users;
  followers: users;
}
