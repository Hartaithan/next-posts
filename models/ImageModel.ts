import {
  DefaultProps,
  ImageStylesNames,
  MantineNumberSize,
} from "@mantine/core";

export interface IImageProps
  extends DefaultProps<ImageStylesNames>,
    Omit<React.ComponentPropsWithoutRef<"div">, "placeholder"> {
  src: string;
  alt?: string;
  fit?: "contain" | "cover";
  width?: number | string;
  height?: number | string;
  radius?: MantineNumberSize;
  withPlaceholder?: boolean;
  placeholder?: React.ReactNode;
  imageProps?: React.ComponentPropsWithoutRef<"img">;
  imageRef?: React.ForwardedRef<HTMLImageElement>;
  caption?: React.ReactNode;
}
