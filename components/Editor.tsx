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
  return (
    <InputWrapper required label="Content" mt={12}>
      <RichTextEditor {...props} />
    </InputWrapper>
  );
};

export default Editor;
