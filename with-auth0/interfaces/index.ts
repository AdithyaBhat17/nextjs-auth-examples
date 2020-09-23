// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  user: Auth0User | null;
  loading: boolean;
};

export interface Auth0User {
  given_name?: string;
  family_name?: string;
  locale?: string;
  sub: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: Date | string;
}
