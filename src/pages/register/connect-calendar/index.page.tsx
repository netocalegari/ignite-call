import { ArrowRight } from "phosphor-react";

import { api } from "@/lib/axios";
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";

import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem } from "./styles";

export default function Register() {
  // const handleRegister = async (data) => {};

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
          <Button variant="secondary" size="sm">
            Connect
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
