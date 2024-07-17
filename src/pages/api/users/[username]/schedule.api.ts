import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const username = String(req.query.username);

  const user = await prisma.user.findUnique({
    where: { username },
  });

  const createSchedulingBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.string().datetime(),
  });

  const { name, email, observations, date } = createSchedulingBodySchema.parse(
    req.body
  );

  const schedulingDate = dayjs(date).startOf("hour");

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: "Date cannot be in the past" });
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      date: schedulingDate.toDate(),
      user_id: user?.id,
    },
  });

  if (conflictingScheduling) {
    return res.status(400).json({ message: "Date already busy." });
  }

  await prisma.scheduling.create({
    data: {
      name,
      email,
      observation: observations,
      date: schedulingDate.toDate(),
      user: { connect: { id: user?.id } },
    },
  });

  const calendar = google;

  return res.status(201).end();
}
