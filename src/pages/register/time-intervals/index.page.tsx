import { Heading, MultiStep, Text } from "@ignite-ui/react";

import { Container, Header } from "../styles";

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Almost done!</Heading>
        <Text>Define the period of the day you are available on each day.</Text>

        <MultiStep size={4} currentStep={2} />
      </Header>
    </Container>
  );
}
