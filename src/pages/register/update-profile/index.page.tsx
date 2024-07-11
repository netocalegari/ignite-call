import { useSession } from "next-auth/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";

import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  console.log(session);

  const handleUpdateProfile = async (data: UpdateProfileData) => {};

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Ignite Call!</Heading>
        <Text>
          We need dome information to create your profile. You can edit these
          later.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Profile picture</Text>
        </label>

        <label>
          <Text size="sm">About you</Text>
          <TextArea {...register("bio")} />
          <FormAnnotation size="sm">
            Talk about yourself. This will be shown in yout personal page.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          End
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}
