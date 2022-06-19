import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";

interface IImageProps extends ImageProps {
  background?: boolean;
}

const ImageFallback: FC<IImageProps> = (props) => {
  const { src, background = false, ...rest } = props;
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
          setImg("./img/post_placeholder.jpg");
        }
      }}
      style={background ? { zIndex: 0 } : {}}
    />
  );
};

export default ImageFallback;
