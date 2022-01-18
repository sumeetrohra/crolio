export interface ICreateUserAccountRequestData {
  firstName: string;
  lastName: string;
}

export interface _uploadURLs {
  documentFront: string;
  documentBack: string;
  selfie: string;
  panCard: string;
}

export interface IInitiateKYCResponseData {
  success: boolean;
  data: _uploadURLs;
}

export enum UploadedDocFace {
  FRONT = "front",
  BACK = "back",
}

export enum UploadedKYCDocType {
  PASSPORT = "passport",
  VOTER_ID = "voterID",
  AADHAR = "aadhar",
  PAN_CARD = "PAN_CARD",
}

export interface IVerifyUploadedDocRequestData {
  documentType: UploadedKYCDocType;
  frontOrBack?: UploadedDocFace;
}

export interface IVerifyUploadedDocResponseData {
  data: any;
}
