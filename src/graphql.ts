/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface NewUser {
   username: string;
}

export interface UpdateUser {
   id: string;
   username: string;
}

export interface User {
   id: string;
   username: string;
   alias?: Nullable<string>;
}

export interface IQuery {
   users(): User[] | Promise<User[]>;
   user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
   createUser(input: NewUser): User | Promise<User>;
   updatePost(input: UpdateUser): Nullable<User> | Promise<Nullable<User>>;
   deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface ISubscription {
   userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
