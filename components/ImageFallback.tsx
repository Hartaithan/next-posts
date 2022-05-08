import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";

const ImageFallback: FC<ImageProps> = (props) => {
  const { src, ...rest } = props;
  const [img, setImg] = useState(src ? src : "/img/post_placeholder.jpg");
  return (
    <Image
      {...rest}
      alt={props.alt}
      src={img}
      placeholder="blur"
      blurDataURL="/img/post_placeholder.jpg"
      onError={() => {
        if (typeof window !== "undefined") {
          console.log("error");
          setImg("./img/post_placeholder.jpg");
        }
      }}
    />
  );
};

export default ImageFallback;
