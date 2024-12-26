export interface Link {
  _id: string;
  shortUrl: string;
  originalUrl: string;
}

export interface LinkMutation {
  originalUrl: string;
}
