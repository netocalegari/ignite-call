import { ArrowRight } from "phosphor-react";

import { Button, TextInput } from "@ignite-ui/react";

import { Form } from "./styles";

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="your-user" />
      <Button size="sm" type="submit">
        Book user
        <ArrowRight />
      </Button>
    </Form>
  );
}
