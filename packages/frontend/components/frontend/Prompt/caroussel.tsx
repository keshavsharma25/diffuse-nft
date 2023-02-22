import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Flex, Image } from "@chakra-ui/react";

type Props = {
  images: string[];
};

export function AsNavFor({ images }: Props) {
  const [nav1, setNav1] = React.useState<Slider | null>(null);
  const [nav2, setNav2] = React.useState<Slider | null>(null);
  const [slider1, setSlider1] = React.useState<Slider | null>(null);
  const [slider2, setSlider2] = React.useState<Slider | null>(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: ".slider-nav",
    swipeToSlide: true,
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    swipeToSlide: true,
    arrows: true,
    focusOnSelect: true,
    centerPadding: "10px",
  };

  return (
    <Box mt="20px">
      <Box>
        <Slider
          {...settingsMain}
          asNavFor={nav1!}
          ref={(slider) => setSlider2(slider!)}
        >
          {images.map((image, id) => {
            return (
              <Box overflow="hidden">
                <Image
                  src={image}
                  alt="image"
                  objectFit="cover"
                  height="512px"
                  width="512px"
                  mx="auto"
                />
              </Box>
            );
          })}
        </Slider>
      </Box>

      <Box mt="20px">
        <Slider
          {...settingsThumbs}
          asNavFor={nav2!}
          ref={(slider) => setSlider1(slider!)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {images.map((image) => {
            return (
              <Box>
                <Image
                  src={image}
                  alt="image"
                  objectFit="cover"
                  height="100px"
                  width="100px"
                  mx="auto"
                />
              </Box>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
}
