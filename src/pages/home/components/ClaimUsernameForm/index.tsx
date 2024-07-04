import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@ignite-ui/react";

import { Form } from "./styles";

const ClaimUsernameFormSchema = z.object({
  username: z.string(),
});

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  });

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    console.log(data);
  };

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="your-user"
        {...register("username")}
      />
      <Button size="sm" type="submit">
        Book user
        <ArrowRight />
      </Button>
    </Form>
  );
}
