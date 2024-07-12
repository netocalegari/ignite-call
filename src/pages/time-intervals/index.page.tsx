import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/lib/axios";
import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minutes";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";

import { Container, Header } from "../register/styles";
import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from "./styles";

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enabled === true)
    )
    .refine((intervals) => intervals.length > 0, {
      message: "You must select at least one day of the week.",
    })
    .transform((intervals) =>
      intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        };
      })
    )
    .refine(
      (intervals) =>
        intervals.every((interval) => {
          return interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes;
        }),
      { message: "Ending time must be at least one hour after starting time. " }
    ),
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;

type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 1,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 2,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 3,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 4,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: "08:00",
          endTime: "18:00",
        },
      ],
    },
  });

  const router = useRouter();

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    name: "intervals",
    control,
  });

  const intervals = watch("intervals");

  const handleSetTimeIntervals = async (data: any) => {
    const { intervals } = data as TimeIntervalsFormOutput;

    await api.post("/users/time-intervals", { intervals });

    await router.push("/register/update-profile");
  };

  return (
    <Container>
      <Header>
        <Heading as="strong">Almost done!</Heading>
        <Text>Define the period of the day you are available on each day.</Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        onCheckedChange={(checked: boolean) => {
                          field.onChange(checked === true);
                        }}
                        checked={field.value}
                      />
                    );
                  }}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                  disabled={intervals[index].enabled === false}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                  disabled={intervals[index].enabled === false}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.root?.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Next step <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
