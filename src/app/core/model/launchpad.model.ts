export interface QueryObject {
  query?: object;
  options?: {
    select?: object;
    populate?: object;
    limit?: number;
    page?: number;
  };
}

export interface ILaunchPad {
  id: string;
  full_name: string;
  region: string;
  wikipedia: string;
  launches: string[];
}

export interface CustomHttpResponse<T> {
  docs: T[];
  limit: number;
  offset: number;
  page: number;
  pagingCounter: number;
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: boolean | null;
  prevPage: boolean | null;
}

export interface IShowMore {
  id: string;
  limit: number;
}
