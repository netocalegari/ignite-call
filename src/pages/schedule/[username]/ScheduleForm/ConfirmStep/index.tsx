import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";

import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

function ordinalSuffixOf(day: number) {
  let j = day % 10,
    k = day % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  const router = useRouter();
  const username = String(router.query.username);

  const handleConfirmScheduling = async (data: ConfirmFormData) => {
    const { name, email, observations } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    });

    onCancelConfirmation();
  };

  const day = dayjs(schedulingDate).format("DD");

  const fullDate = dayjs(schedulingDate).format(
    `MMMM DD[${ordinalSuffixOf(Number(day))}] YYYY`
  );
  const fullTime = dayjs(schedulingDate).format("HH:mm[h]");

  return (
    <ConfirmForm onSubmit={handleSubmit(handleConfirmScheduling)} as="form">
      <FormHeader>
        <Text>
          <CalendarBlank />
          {fullDate}
        </Text>

        <Text>
          <Clock />
          {fullTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Full name</Text>
        <TextInput placeholder="Your name" {...register("name")} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Email</Text>
        <TextInput
          type="email"
          placeholder="johndoe@domain.com"
          {...register("email")}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observations</Text>
        <TextArea {...register("observations")} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirm
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
