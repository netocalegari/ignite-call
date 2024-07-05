import Image from "next/image";

import { Heading, Text } from "@ignite-ui/react";

import previewImage from "../../assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";
import { Container, Hero, Preview } from "./styles";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Easy booking</Heading>
        <Text size="xl">
          Connect your calendar and allow people to book your time.
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
        ></Image>
      </Preview>
    </Container>
  );
}
