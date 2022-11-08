/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AuthResponse {
   accessToken?: Nullable<string>;
   type: string;
}

export interface IMutation {
   deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
   login(
      login: string,
      password: string,
   ): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
   register(
      email: string,
      password: string,
      username: string,
   ): UserRegistered | Promise<UserRegistered>;
}

export interface IQuery {
   user(id: string): Nullable<User> | Promise<Nullable<User>>;
   users(): User[] | Promise<User[]>;
}

export interface User {
   email: string;
   id: string;
   username: string;
}

export interface UserRegistered {
   id: string;
}

type Nullable<T> = T | null;
