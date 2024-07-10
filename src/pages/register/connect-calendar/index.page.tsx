import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";

import { api } from "@/lib/axios";
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";

import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";

export default function Register() {
  const session = useSession();

  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

  console.log(session);

  const handleConnectCalendar = async () => {
    await signIn("google");
  };

  return (
    <Container>
      <Header>
        <Heading as="strong">Connect your schedule!</Heading>
        <Text>
          Connect your calendar to automatically verify your busy hours and new
          events as they are booked.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Connect
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Error connecting to Google. Verify if you have accepted all
            necessary access permissions.
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
