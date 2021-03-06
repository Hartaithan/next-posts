import { Center, Group, Loader, MantineTheme, Text } from "@mantine/core";
import { Photo } from "tabler-icons-react";
import { DropzoneStatus } from "@mantine/dropzone";
import { IPreviewState } from "../models/DropzoneModel";

const getIconColor = (status: DropzoneStatus, theme: MantineTheme) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
};

const DropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  preview: IPreviewState
) => {
  return (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight: 220, pointerEvents: "none" }}
    >
      {preview.url ? (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {preview.isLoading && (
            <Center
              style={{ width: "100%", height: "100%", position: "absolute" }}
            >
              <Loader />
            </Center>
          )}
          <img
            src={preview.url}
            alt="dropzone"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: preview.isLoading ? 0.3 : 1,
            }}
          />
        </div>
      ) : (
        <>
          <Photo style={{ color: getIconColor(status, theme) }} size={80} />
          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </>
      )}
    </Group>
  );
};

export default DropzoneChildren;
