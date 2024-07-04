import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@ignite-ui/react";

import { Form, FormAnnotation } from "./styles";

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "Username must not contain numbers, symbols or whitespace",
    })
    .toLowerCase(),
});

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  });

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    console.log(data);
  };

  return (
    <>
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

      <FormAnnotation>
        <Text size="sm"></Text>{" "}
        {errors.username
          ? errors.username.message
          : "Inform the desired username"}
      </FormAnnotation>
    </>
  );
}
