export interface MemberType {
  mid: string;
  mpassword: string;
  confirmPassword: string;
  mname: string;
  mrole: "ADMIN" | "MANAGER" | "USER";
  address: string;
  addressDetail: string;
}
