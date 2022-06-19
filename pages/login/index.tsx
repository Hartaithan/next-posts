import { useForm } from "@mantine/hooks";
import { TextInput, Text, Paper, Group, Button, Center } from "@mantine/core";
import MainLayout from "../../layouts/MainLayout";
import { showNotification } from "@mantine/notifications";
import { useAuth } from "../../context/auth";
import { supabase } from "../../utils/supabaseClient";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import useOnceEffect from "../../hooks/useOnceEffect";

interface ILoginPageProps {
  auth: string | string[] | null;
}

export const getServerSideProps: GetServerSideProps<ILoginPageProps> = async ({
  req,
  query,
}) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const auth = query?.auth ? query.auth : null;
  if (user) {
    return { props: { auth }, redirect: { destination: "/" } };
  }
  return {
    props: { auth },
  };
};

const LoginPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { auth } = props;
  const { login } = useAuth();
  const form = useForm({
    initialValues: {
      email: "",
    },
    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
    },
  });

  useOnceEffect(() => {
    if (auth) {
      showNotification({
        title: "Access denied",
        color: "blue",
        message: "You must be logged in to access this page.",
      });
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    login(values.email)
      .then(() => {
        showNotification({
          title: "Success",
          color: "green",
          message: "Check your email for the login link!",
        });
      })
      .catch(({ error }) => {
        showNotification({
          title: "Error",
          color: "red",
          message: error.error_description || error.message || "Login error",
        });
      });
  };

  return (
    <MainLayout title={"Login"}>
      <Center style={{ width: "100%", height: "100%" }}>
        <Paper radius="md" p="xl" withBorder style={{ width: "100%" }}>
          <Text size="lg" mb={6} weight={500}>
            Login
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group direction="column" grow>
              <TextInput
                required
                label="Email"
                placeholder="email@example.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
              />
            </Group>
            <Group position="apart" mt="xl">
              <Button type="submit" fullWidth>
                Send magic link
              </Button>
            </Group>
          </form>
        </Paper>
      </Center>
    </MainLayout>
  );
};

export default LoginPage;
