export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-24'

export const dataset = process.env.NODE_ENV == "development" ? assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET_DEVELOPMENT,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET_DEVELOPMENT'
) : assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET_PRODUCTION,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET_PRODUCTION'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  "Missing environment variable: NEXT_PUBLIC_SANITY_WRITE_TOKEN"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
