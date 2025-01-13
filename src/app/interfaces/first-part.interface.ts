export interface ArrayContainer {
  files: File[];
  logotypes: Logo[];
}
export interface File {
  name: string;
  commitMessage: string;
  timeAgo: string;
  imgSrc: string;
}
export interface Logo {
  image: string
}