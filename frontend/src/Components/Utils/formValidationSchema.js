import * as yup from "yup";
import { array, date, object, string, number } from "yup";

export const listingSchema = object()
  .shape({
    name: string().required("Name is required"),
  })
  .required("Required");
