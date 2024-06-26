import { z } from "zod"
export const formSchema = z.object({
    title: z.string().min(5,"title must have at least 5 characters").max(50, "title must not exceed 50 characters"),
    description:z.string().min(10,"description must have at least 10 characters").max(500, "description must not exceed 300 characters"),
    location:z.string().min(5,"location must have at least 5 characters").max(300, "location must not exceed 30 characters"),
    imageUrl:z.string(),
    startDate:z.coerce.date().refine((data) => data > new Date(), {message:"start date must be in the future"} ),
    endDate:z.date(),
    categoryId:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url(),
  }) .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

