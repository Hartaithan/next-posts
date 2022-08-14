import { FC } from "react";
import {
  createStyles,
  Header as MantineHeader,
  Container,
  Button,
  Skeleton,
} from "@mantine/core";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/auth";
import { showNotification } from "@mantine/notifications";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 10,
    marginBottom: 30,
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
  auth: {
    marginRight: "12px",
  },
}));

const MobileHeader: FC = () => {
  const { classes } = useStyles();
  const { isAuth, isLoading, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        showNotification({
          title: "Success",
          color: "green",
          message: "Logout successful",
        });
      })
      .catch(({ error }) => {
        showNotification({
          title: "Error",
          color: "red",
          message: error.error_description || error.message || "Logout failed",
        });
      });
  };

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        {isAuth ? (
          <Button
            className={classes.auth}
            onClick={() => handleLogout()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Skeleton height={8} radius="xl" width="50px" />
            ) : (
              "Log out"
            )}
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button className={classes.auth} disabled={isLoading}>
              {isLoading ? (
                <Skeleton height={8} radius="xl" width="50px" />
              ) : (
                "Log in"
              )}
            </Button>
          </Link>
        )}
        <ThemeToggle />
      </Container>
    </MantineHeader>
  );
};

export default MobileHeader;
