import React, { memo } from "react";
import { useParams } from "react-router-dom";
import useGetImageInfo from "@/ui/hooks/useGetImageInfo";
import DetailPageHeader from "@/ui/detailPage/DetailPageHeader";
import ImageDetailsContainer from "@/ui/detailPage/ImageDetailsContainer";
import LoadingText from "@/ui/detailPage/LoadingText";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <LoadingText>Image ID is required</LoadingText>;
  }

  const { imageInfo, isLoading } = useGetImageInfo(id);

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  if (!imageInfo) {
    return <LoadingText>Image not found</LoadingText>;
  }

  return (
    <>
      <DetailPageHeader />
      <ImageDetailsContainer imageInfo={imageInfo} />
    </>
  );
};

export default memo(DetailPage);
