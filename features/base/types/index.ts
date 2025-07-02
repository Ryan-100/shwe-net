import { z } from "zod";

export const fileUploadRequestScheam = z.object({
  file: z.instanceof(File),
});

export type FileUploadRequest = z.infer<typeof fileUploadRequestScheam>;


export const invoiceResponseSchema = z.object({
  verification_id: z.string(),
  doc_type: z.string(),
  processed_data: z.object({
    invoice_number: z.string(),
    invoice_date: z.string(),
    due_date: z.string(),
    bill_to_name: z.string(),
    bill_to_address: z.string(),
    subtotal: z.number(),
    sales_tax: z.number(),
    total: z.number(),
    payment_due: z.string(),
    invoice_items: z.array(
      z.object({
        quantity: z.number(),
        description: z.string(),
        unit_price: z.number(),
        amount: z.number()
      })
    )
  }),
  classified_data: z.object({
    transactions: z.object({
      transactions: z.array(
        z.object({
          description: z.string(),
          amount: z.number(),
          transaction_date: z.string(),
          transaction_type: z.string(),
          category: z.string(),
          account: z.string(),
          source_document_type: z.string(),
          source_document_id: z.string()
        })
      )
    })
  })
})
export type InvoiceResponse = z.infer<typeof invoiceResponseSchema>;

export const receiptResponseSchema = z.object({
  verification_id: z.string(),
  doc_type: z.string(),
  processed_data: z.object({
    receipt_id: z.string(),
    purchase_date: z.string(),
    purchase_time: z.null(),
    vendor_name: z.string(),
    vendor_address: z.string(),
    subtotal: z.number(),
    tax: z.number(),
    total: z.number(),
    item_count: z.number(),
    receipt_items: z.array(
      z.object({
        quantity: z.number(),
        name: z.string(),
        unit_price: z.number(),
        total: z.number()
      })
    )
  }),
  classified_data: z.object({
    transactions: z.object({
      transactions: z.array(
        z.object({
          description: z.string(),
          amount: z.number(),
          transaction_date: z.string(),
          transaction_type: z.string(),
          category: z.string(),
          account: z.string(),
          source_document_type: z.string(),
          source_document_id: z.string()
        })
      )
    })
  })
})
export type ReceiptResponse = z.infer<typeof receiptResponseSchema>;

export const documentVerificationResponseSchema = z.union([invoiceResponseSchema, receiptResponseSchema]);
export type DocumentVerificationResponse = z.infer<typeof documentVerificationResponseSchema>;

export interface APISResponse<T> {}

export interface ErrorResponse {
  detail: [
    {
        type: string;
        loc: string[];
        msg: string;
        input: string
    }
  ]
}