import { useState } from "react"
import { Check, FileText, AlertCircle, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditScanResultModal } from "./EditScanResultModal"
import { InvoiceResponse, ReceiptResponse } from "@/features/base/types"

interface ScanResultsProps {
  result: InvoiceResponse | ReceiptResponse;
  onConfirm: () => void;
  onEdit: (updatedResult: InvoiceResponse | ReceiptResponse) => void;
}

export const ScanResults = ({ result, onConfirm, onEdit }: ScanResultsProps) => {
  const [selectedResult, setSelectedResult] = useState<InvoiceResponse | ReceiptResponse | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEditClick = () => {
    setSelectedResult(result)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (updatedResult: InvoiceResponse | ReceiptResponse) => {
    onEdit(updatedResult)
  }

  function isInvoiceResponse(result: InvoiceResponse | ReceiptResponse): result is InvoiceResponse {
    return result.doc_type === 'INVOICE';
  }
  function isReceiptResponse(result: InvoiceResponse | ReceiptResponse): result is ReceiptResponse {
    return result.doc_type === 'RECEIPT';
  }

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center text-2xl">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
              <Check className="h-5 w-5 text-white" />
            </div>
            Extraction Complete
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 ml-12">
            AI has successfully extracted and validated your financial data
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-8">
            <div className="border border-amber-200 rounded-2xl p-8 bg-gradient-to-br from-white to-amber-50/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-2">General Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><b>Verification ID:</b> {result.verification_id}</div>
                  <div><b>Type:</b> {result.doc_type}</div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-2">Processed Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isInvoiceResponse(result) ? (
                    <>
                      <div><b>Invoice Number:</b> {result.processed_data.invoice_number}</div>
                      <div><b>Invoice Date:</b> {result.processed_data.invoice_date}</div>
                      <div><b>Due Date:</b> {result.processed_data.due_date}</div>
                      <div><b>Bill To Name:</b> {result.processed_data.bill_to_name}</div>
                      <div><b>Bill To Address:</b> {result.processed_data.bill_to_address}</div>
                      <div><b>Subtotal:</b> {result.processed_data.subtotal}</div>
                      <div><b>Sales Tax:</b> {result.processed_data.sales_tax}</div>
                      <div><b>Total:</b> {result.processed_data.total}</div>
                      <div><b>Payment Due:</b> {result.processed_data.payment_due}</div>
                    </>
                  ) : (
                    <>
                      <div><b>Receipt ID:</b> {result.processed_data.receipt_id}</div>
                      <div><b>Purchase Date:</b> {result.processed_data.purchase_date}</div>
                      <div><b>Purchase Time:</b> {result.processed_data.purchase_time || '-'}</div>
                      <div><b>Vendor Name:</b> {result.processed_data.vendor_name}</div>
                      <div><b>Vendor Address:</b> {result.processed_data.vendor_address}</div>
                      <div><b>Subtotal:</b> {result.processed_data.subtotal}</div>
                      <div><b>Tax:</b> {result.processed_data.tax}</div>
                      <div><b>Total:</b> {result.processed_data.total}</div>
                      <div><b>Item Count:</b> {result.processed_data.item_count}</div>
                    </>
                  )}
                </div>
                {/* Items Table */}
                {isInvoiceResponse(result) ? (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Invoice Items</h4>
                    <table className="min-w-full text-sm border [&_th]:text-left">
                      <thead><tr><th>Qty</th><th>Description</th><th>Unit Price</th><th>Amount</th></tr></thead>
                      <tbody>
                        {result.processed_data.invoice_items.map((item, idx) => (
                          <tr key={idx} className="border-t">
                            <td>{item.quantity}</td>
                            <td>{item.description}</td>
                            <td>{item.unit_price}</td>
                            <td>{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Receipt Items</h4>
                    <table className="min-w-full text-sm border [&_th]:text-left">
                      <thead><tr><th>Qty</th><th>Name</th><th>Unit Price</th><th>Total</th></tr></thead>
                      <tbody>
                        {result.processed_data.receipt_items.map((item, idx) => (
                          <tr key={idx} className="border-t">
                            <td>{item.quantity}</td>
                            <td>{item.name}</td>
                            <td>{item.unit_price}</td>
                            <td>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-2">Classified Transactions</h3>
                <table className="min-w-full text-sm border [&_th]:text-start">
                  <thead><tr><th>Description</th><th>Amount</th><th>Date</th><th>Type</th><th>Category</th><th>Account</th></tr></thead>
                  <tbody>
                    {result.classified_data.transactions.transactions.map((txn, idx) => (
                      <tr key={idx} className="border-t">
                        <td>{txn.description}</td>
                        <td>{txn.amount}</td>
                        <td>{txn.transaction_date}</td>
                        <td>{txn.transaction_type}</td>
                        <td>{txn.category}</td>
                        <td>{txn.account}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button 
                variant="outline" 
                onClick={handleEditClick}
                className="w-full h-12 text-lg font-semibold border-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300"
              >
                Edit Details
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={() => { console.log(result); onConfirm(); }}
                className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Check className="h-5 w-5 mr-3" />
                Confirm & Save to Vault
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedResult && (
        <EditScanResultModal
          result={selectedResult}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
} 