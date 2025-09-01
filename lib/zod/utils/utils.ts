import { ZodString } from "zod";

export const getMaxLength = (schema: ZodString) => {
  const checks = (schema._def as any).checks
  const filtered =  checks.filter((check: any) => {
    return check._zod.def.check == "max_length"
  })
  return filtered[0]?._zod?.def?.maximum
};

export const getMinLength = (schema: ZodString): number | undefined => {
  const checks = (schema._def as any).checks
  const filtered =  checks.filter((check: any) => {
    return check._zod.def.check == "min_length"
  })
  return filtered[0]?._zod?.def?.minimum
};
