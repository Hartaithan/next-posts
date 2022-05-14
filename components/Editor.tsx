import dynamic from "next/dynamic";
import { Center, InputWrapper, Loader } from "@mantine/core";
import type { RichTextEditorProps } from "@mantine/rte";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => (
    <Center mt={16}>
      <Loader />
    </Center>
  ),
});

const Editor = (props: RichTextEditorProps) => {
  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fd = new FormData();
      fd.append("file", file);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: fd,
      })
        .then((res) => res.json())
        .then((res) => resolve(res.image_url))
        .catch(() => reject(new Error("Upload failed")));
    });
  };

  return (
    <InputWrapper required label="Content" mt={12}>
      <RichTextEditor {...props} onImageUpload={handleImageUpload} />
    </InputWrapper>
  );
};

export default Editor;
