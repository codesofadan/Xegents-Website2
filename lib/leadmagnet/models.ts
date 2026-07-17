import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose"

/* ── Lead Magnet ──────────────────────────────────────────────────────────── */

const LeadMagnetSchema = new Schema(
  {
    slug:        { type: String, required: true, unique: true, index: true },
    title:       { type: String, required: true },
    tagline:     { type: String, default: "" },
    description: { type: String, default: "" },
    // What's-inside bullet points shown on the landing page
    bullets:     { type: [String], default: [] },
    // Price in USD. 0 = free.
    price:       { type: Number, required: true, default: 0, min: 0 },
    // Cloudinary-hosted file (raw asset)…
    fileUrl:      { type: String, default: "" },
    filePublicId: { type: String, default: "" },
    fileName:     { type: String, default: "" },
    fileSize:     { type: Number, default: 0 },
    // …or an external download URL (Drive/Dropbox/S3).
    externalUrl:  { type: String, default: "" },
    active:      { type: Boolean, default: true },
  },
  { timestamps: true }
)

/* ── Lead (form submission) ───────────────────────────────────────────────── */

const LeadSchema = new Schema(
  {
    magnetId:      { type: Schema.Types.ObjectId, ref: "LeadMagnet", required: true, index: true },
    name:          { type: String, required: true },
    email:         { type: String, required: true, index: true },
    agency:        { type: String, default: "" },
    phone:         { type: String, default: "" },
    // free_delivered  → free magnet, delivery email sent
    // pending_stripe  → paid, waiting on Stripe checkout
    // pending_bank    → paid, chose bank transfer, waiting on manual confirm
    // paid_delivered  → payment confirmed, delivery email sent
    status:        { type: String, required: true, default: "free_delivered", index: true },
    paymentMethod: { type: String, default: "" }, // "stripe" | "bank" | ""
    stripeSession: { type: String, default: "" },
    deliveredAt:   { type: Date, default: null },
  },
  { timestamps: true }
)

export type LeadMagnetDoc = InferSchemaType<typeof LeadMagnetSchema> & { _id: mongoose.Types.ObjectId }
export type LeadDoc       = InferSchemaType<typeof LeadSchema> & { _id: mongoose.Types.ObjectId }

// Guard against model recompilation on hot reload
export const LeadMagnet: Model<LeadMagnetDoc> =
  (mongoose.models.LeadMagnet as Model<LeadMagnetDoc>) ?? mongoose.model<LeadMagnetDoc>("LeadMagnet", LeadMagnetSchema)

export const Lead: Model<LeadDoc> =
  (mongoose.models.Lead as Model<LeadDoc>) ?? mongoose.model<LeadDoc>("Lead", LeadSchema)
