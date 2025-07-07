import mongoose, { Schema, type Document } from "mongoose"

export interface ITransaction extends Document {
  _id: string
  amount: number
  date: Date
  description: string
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      validate: {
        validator: (v: number) => !isNaN(v) && isFinite(v),
        message: "Amount must be a valid number",
      },
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: (v: Date) => v instanceof Date && !isNaN(v.getTime()),
        message: "Date must be a valid date",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [1, "Description cannot be empty"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret._id.toString()
        return ret
      },
    },
  },
)

// Create indexes for better query performance
TransactionSchema.index({ date: -1 })
TransactionSchema.index({ createdAt: -1 })

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema)
