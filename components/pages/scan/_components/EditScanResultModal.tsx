import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { InvoiceResponse, ReceiptResponse } from "@/features/base/types"

interface EditScanResultModalProps {
  result: InvoiceResponse | ReceiptResponse
  isOpen: boolean
  onClose: () => void
  onSave: (updatedResult: InvoiceResponse | ReceiptResponse) => void
}

function isInvoiceResponse(result: InvoiceResponse | ReceiptResponse): result is InvoiceResponse {
  return result.doc_type === 'INVOICE';
}
function isReceiptResponse(result: InvoiceResponse | ReceiptResponse): result is ReceiptResponse {
  return result.doc_type === 'RECEIPT';
}

export const EditScanResultModal = ({ result, isOpen, onClose, onSave }: EditScanResultModalProps) => {
  // Conditional schema and default values
  const isInvoice = isInvoiceResponse(result);
  const formSchema = isInvoice
    ? z.object({
        bill_to_name: z.string().min(2, "Bill to name must be at least 2 characters"),
        invoice_number: z.string().min(1, "Invoice number is required"),
        invoice_date: z.string().min(1, "Invoice date is required"),
        due_date: z.string().min(1, "Due date is required"),
        subtotal: z.number(),
        sales_tax: z.number(),
        total: z.number(),
        bill_to_address: z.string().optional(),
        payment_due: z.string().optional(),
        invoice_items: z.any(),
        transactions: z.any(),
      })
    : z.object({
        vendor_name: z.string().min(2, "Vendor name must be at least 2 characters"),
        receipt_id: z.string().min(1, "Receipt ID is required"),
        purchase_date: z.string().min(1, "Purchase date is required"),
        purchase_time: z.string().optional(),
        vendor_address: z.string().optional(),
        subtotal: z.number(),
        tax: z.number(),
        total: z.number(),
        receipt_items: z.any(),
        transactions: z.any(),
      });

  const defaultValues = isInvoice && isInvoiceResponse(result)
    ? {
        bill_to_name: result.processed_data.bill_to_name || "",
        invoice_number: result.processed_data.invoice_number || "",
        invoice_date: result.processed_data.invoice_date || "",
        due_date: result.processed_data.due_date || "",
        subtotal: result.processed_data.subtotal,
        sales_tax: result.processed_data.sales_tax,
        total: result.processed_data.total,
        bill_to_address: result.processed_data.bill_to_address || "",
        payment_due: result.processed_data.payment_due || "",
        invoice_items: result.processed_data.invoice_items,
        transactions: result.classified_data.transactions.transactions,
      }
    : isReceiptResponse(result)
    ? {
        vendor_name: result.processed_data.vendor_name || "",
        receipt_id: result.processed_data.receipt_id || "",
        purchase_date: result.processed_data.purchase_date || "",
        purchase_time: result.processed_data.purchase_time || "",
        vendor_address: result.processed_data.vendor_address || "",
        subtotal: result.processed_data.subtotal,
        tax: result.processed_data.tax,
        total: result.processed_data.total,
        receipt_items: result.processed_data.receipt_items,
        transactions: result.classified_data.transactions.transactions,
      }
    : {};

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Field arrays for items and transactions
  const invoiceItemsArray = useFieldArray({
    control: form.control,
    name: "invoice_items",
  });
  const receiptItemsArray = useFieldArray({
    control: form.control,
    name: "receipt_items",
  });
  const transactionsArray = useFieldArray({
    control: form.control,
    name: "transactions",
  });

  const onSubmit = (values: any) => {
    let updatedResult = { ...result };
    if (isInvoice) {
      updatedResult = {
        ...result,
        processed_data: {
          ...result.processed_data,
          ...values,
          invoice_items: values.invoice_items || result.processed_data.invoice_items,
        },
        classified_data: {
          ...result.classified_data,
          transactions: {
            transactions: values.transactions || result.classified_data.transactions.transactions,
          },
        },
      };
    } else {
      updatedResult = {
        ...result,
        processed_data: {
          ...result.processed_data,
          ...values,
          receipt_items: values.receipt_items || result.processed_data.receipt_items,
        },
        classified_data: {
          ...result.classified_data,
          transactions: {
            transactions: values.transactions || result.classified_data.transactions.transactions,
          },
        },
      };
    }
    onSave(updatedResult);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] sm:max-w-[700px] rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Edit Document Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isInvoice ? (
              <>
                <FormField
                  control={form.control}
                  name="bill_to_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bill To Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoice_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoice_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subtotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtotal</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sales_tax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sales Tax</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="vendor_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receipt_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receipt ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="purchase_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subtotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtotal</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {/* Items array */}
            {isInvoice ? (
              <div>
                <h4 className="font-semibold mb-2">Invoice Items</h4>
                {invoiceItemsArray.fields.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-4 gap-2 mb-2">
                    <FormField control={form.control} name={`invoice_items.${idx}.quantity`} render={({ field }) => <FormItem><FormLabel>Qty</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name={`invoice_items.${idx}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name={`invoice_items.${idx}.unit_price`} render={({ field }) => <FormItem><FormLabel>Unit Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name={`invoice_items.${idx}.amount`} render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h4 className="font-semibold mb-2">Receipt Items</h4>
                {receiptItemsArray.fields.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-4 gap-2 mb-2">
                    <FormField control={form.control} name={`receipt_items.${idx}.quantity`} render={({ field }) => <FormItem><FormLabel>Qty</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name={`receipt_items.${idx}.name`} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name={`receipt_items.${idx}.unit_price`} render={({ field }) => <FormItem><FormLabel>Unit Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name={`receipt_items.${idx}.total`} render={({ field }) => <FormItem><FormLabel>Total</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                  </div>
                ))}
              </div>
            )}
            {/* Transactions array */}
            <div>
              <h4 className="font-semibold mb-2">Transactions</h4>
              {transactionsArray.fields.map((txn, idx) => (
                <div key={txn.id} className="flex items-center flex-wrap gap-2 mb-2">
                  <FormField control={form.control} name={`transactions.${idx}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`transactions.${idx}.amount`} render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`transactions.${idx}.transaction_date`} render={({ field }) => <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`transactions.${idx}.transaction_type`} render={({ field }) => <FormItem><FormLabel>Type</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`transactions.${idx}.category`} render={({ field }) => <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`transactions.${idx}.account`} render={({ field }) => <FormItem><FormLabel>Account</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`transactions.${idx}.source_document_id`} render={({ field }) => <FormItem><FormLabel>Source Doc ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                </div>
              ))}
            </div>
            <DialogFooter className="flex flex-row justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 