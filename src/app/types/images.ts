export type BlobImage = {
  url: string;
  pathname: string;
  fileName: string;
  size: number;
  uploadedAt?: string;
  /** Descriptive alt text; falls back to the folder description when absent. */
  alt?: string;
};

export type BlobImageProps = {
  images: Map<string, string>;
};

export type BlobImageMapProps = {
  images: Map<string, BlobImage>;
};
