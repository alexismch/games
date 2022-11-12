/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AuthResponse {
   type: string;
}

export interface BaseUser {
   id: string;
   registeredOn: DateTime;
   username: string;
}

export interface LoginAuthResponse extends AuthResponse {
   accessToken?: Nullable<string>;
   expiresIn?: Nullable<number>;
   type: string;
}

export interface LogoutAuthResponse extends AuthResponse {
   type: string;
}

export interface IMutation {
   deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
   login(
      login: string,
      password: string,
   ): Nullable<LoginAuthResponse> | Promise<Nullable<LoginAuthResponse>>;
   logout():
      | Nullable<LogoutAuthResponse>
      | Promise<Nullable<LogoutAuthResponse>>;
   register(
      email: EmailAddress,
      password: string,
      username: string,
   ): UserRegistered | Promise<UserRegistered>;
}

export interface IQuery {
   user(): SelfUser | Promise<SelfUser>;
   users(): User[] | Promise<User[]>;
}

export interface SelfUser extends BaseUser {
   email: EmailAddress;
   id: string;
   registeredOn: DateTime;
   username: string;
}

export interface User extends BaseUser {
   id: string;
   registeredOn: DateTime;
   username: string;
}

export interface UserRegistered {
   id: string;
}

export type AccountNumber = any;
export type BigInt = any;
export type Byte = any;
export type CountryCode = any;
export type Cuid = any;
export type Currency = any;
export type DID = any;
export type DateTime = any;
export type Duration = any;
export type EmailAddress = any;
export type GUID = any;
export type HSL = any;
export type HSLA = any;
export type HexColorCode = any;
export type Hexadecimal = any;
export type IBAN = any;
export type IP = any;
export type IPv4 = any;
export type IPv6 = any;
export type ISBN = any;
export type ISO8601Duration = any;
export type JSON = any;
export type JSONObject = any;
export type JWT = any;
export type Latitude = any;
export type LocalDate = any;
export type LocalEndTime = any;
export type LocalTime = any;
export type Locale = any;
export type Long = any;
export type Longitude = any;
export type MAC = any;
export type NegativeFloat = any;
export type NegativeInt = any;
export type NonEmptyString = any;
export type NonNegativeFloat = any;
export type NonNegativeInt = any;
export type NonPositiveFloat = any;
export type NonPositiveInt = any;
export type ObjectID = any;
export type PhoneNumber = any;
export type Port = any;
export type PositiveFloat = any;
export type PositiveInt = any;
export type PostalCode = any;
export type RGB = any;
export type RGBA = any;
export type RoutingNumber = any;
export type SafeInt = any;
export type SemVer = any;
export type Time = any;
export type TimeZone = any;
export type Timestamp = any;
export type URL = any;
export type USCurrency = any;
export type UUID = any;
export type UnsignedFloat = any;
export type UnsignedInt = any;
export type UtcOffset = any;
export type Void = any;
type Nullable<T> = T | null;
