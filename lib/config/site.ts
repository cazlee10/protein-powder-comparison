export const DONATE_CURRENCY = (process.env.STRIPE_DONATE_CURRENCY ?? 'aud').toLowerCase()

export const DONATE_PRESET_AMOUNTS = [5, 10, 25, 50] as const
