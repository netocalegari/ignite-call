import { ArrowRight } from "phosphor-react";

import { Button, TextInput } from "@ignite-ui/react";

import { Form } from "./styles";

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="your-username" />
      <Button size="sm" type="Submit">
        <ArrowRight />
        Book user
      </Button>
    </Form>
  );
}
