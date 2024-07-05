import Image from "next/image";

import { Heading, Text } from "@ignite-ui/react";

import previewImage from "../../assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";
import { Container, Hero, Preview } from "./styles";

function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Easy booking</Heading>
        <Text size="lg">
          Sync with your calendar an allow ohers to book your time.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Preview of the working app"
        />
      </Preview>
    </Container>
  );
}

export default Home;
