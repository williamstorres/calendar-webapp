import { TZDate } from "@date-fns/tz";
import { isValid } from "date-fns";
import { z } from "zod";

export const tzdate = z.custom<TZDate>((val) => isValid(val));
