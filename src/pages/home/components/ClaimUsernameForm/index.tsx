import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@ignite-ui/react";

import { Form, FormAnnotation } from "./styles";

<<<<<<< HEAD
const ClaimUsernameFormSchema = z.object({
=======
const claimUsernameFormSchema = z.object({
>>>>>>> debugging
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .regex(/^([a-z\\-]+)$/i, {
<<<<<<< HEAD
      message: "Username must not contain numbers, symbols or whitespace",
=======
      message: "Username must not contain numbers or special characters",
>>>>>>> debugging
    })
    .toLowerCase(),
});

<<<<<<< HEAD
type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>;

=======
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;
>>>>>>> debugging
export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
<<<<<<< HEAD
    resolver: zodResolver(ClaimUsernameFormSchema),
  });

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    console.log(data);
  };
=======
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data);
  }
>>>>>>> debugging

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
<<<<<<< HEAD
          placeholder="your-user"
          {...register("username")}
        />
        <Button size="sm" type="submit">
=======
          placeholder="your-username"
          {...register("username")}
        />
        <Button size="sm" type="Submit">
>>>>>>> debugging
          Book user
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
<<<<<<< HEAD
        <Text size="sm"></Text>{" "}
        {errors.username
          ? errors.username.message
          : "Inform the desired username"}
=======
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : "Search for the desired user"}
        </Text>
>>>>>>> debugging
      </FormAnnotation>
    </>
  );
}
