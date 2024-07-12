import { CalendarBlank, Clock } from "phosphor-react";

import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";

import { ConfirmForm, FormActions, FormHeader } from "./styles";

export function ConfirmStep() {
  const handleConfirmScheduling = () => {};

  return (
    <ConfirmForm onSubmit={handleConfirmScheduling} as="form">
      <FormHeader>
        <Text>
          <CalendarBlank />
          September 22th of 2024
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Full name</Text>
        <TextInput placeholder="Your name" />
      </label>

      <label>
        <Text size="sm">Email</Text>
        <TextInput type="email" placeholder="johndoe@domain.com" />
      </label>

      <label>
        <Text size="sm">Observations</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </FormActions>
    </ConfirmForm>
  );
}
