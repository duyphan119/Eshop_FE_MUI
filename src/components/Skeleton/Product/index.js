import { Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <>
      <Skeleton variant="rectangular" height={320} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </>
  );
};

export default ProductSkeleton;
