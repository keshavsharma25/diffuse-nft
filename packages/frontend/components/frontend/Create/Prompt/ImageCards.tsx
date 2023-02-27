import { Box, Grid, Image } from "@chakra-ui/react";

type Props = {
  images: string[];
  selectImage: string;
  setSelectImage: React.Dispatch<React.SetStateAction<string>>;
};

export function ImageCards({ images, selectImage, setSelectImage }: Props) {
  const handleOnClickImage = (image: string) => {
    setSelectImage(image);
  };

  return (
    <Grid mt="5rem" templateColumns="repeat(4, 1fr)" gap="2rem">
      {images.map((image, key) => (
        <Box
          onClick={() => {
            handleOnClickImage(image);
          }}
          key={key}
          border={selectImage === image ? "5px solid #000" : "1px solid #fff"}
          borderRadius="lg"
          cursor="pointer"
          overflow="hidden"
        >
          <Image src={image} draggable={false} />
        </Box>
      ))}
    </Grid>
  );
}
