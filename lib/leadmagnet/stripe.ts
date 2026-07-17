import Stripe from "stripe"

/** Lazy Stripe client — only required when a paid magnet uses card checkout. */

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

let cached: Stripe | null = null
export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set in .env.local")
  if (!cached) cached = new Stripe(key)
  return cached
}

/** Bank-transfer details shown to buyers who choose direct transfer. */
export function bankDetails(): string {
  return (
    process.env.BANK_TRANSFER_DETAILS ||
    "Bank transfer details not configured yet — please contact business.zainsaeed@gmail.com to complete your purchase."
  )
}
