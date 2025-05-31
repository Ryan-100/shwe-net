import { useState } from "react"
import { Check, FileText, AlertCircle, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditScanResultModal } from "./EditScanResultModal"

interface ScanResult {
  id: number
  filename: string
  vendor: string
  amount: number
  date: string
  category: string
  confidence: number
  status: string
}

interface ScanResultsProps {
  results: ScanResult[]
  onConfirm: () => void
  onEdit: (updatedResults: ScanResult[]) => void
}

export const ScanResults = ({ results, onConfirm, onEdit }: ScanResultsProps) => {
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEditClick = (result: ScanResult) => {
    setSelectedResult(result)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (updatedResult: ScanResult) => {
    const updatedResults = results.map(result => 
      result.id === updatedResult.id ? updatedResult : result
    )
    onEdit(updatedResults)
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
            {results.map((result) => (
              <div key={result.id} className="border border-amber-200 rounded-2xl p-8 bg-gradient-to-br from-white to-amber-50/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col-reverse items-end md:flex-row md:items-start justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-bold text-2xl text-gray-900 mb-2">{result.vendor}</h3>
                    <p className="text-gray-600 text-lg flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {result.filename}
                    </p>
                  </div>
                  <Badge className={`px-4 py-2 text-lg font-semibold ${
                    result.confidence >= 95 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : result.confidence >= 85 
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-orange-100 text-orange-800 border-orange-200'
                  }`}>
                    <Shield className="h-4 w-4 mr-2" />
                    {result.confidence}% confidence
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/80 rounded-xl p-4 border border-amber-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Amount</label>
                    <p className="text-3xl font-bold text-amber-600">${result.amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4 border border-amber-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Date</label>
                    <p className="text-xl font-semibold text-gray-900">{result.date}</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4 border border-amber-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                    <p className="text-xl font-semibold text-gray-900">{result.category}</p>
                  </div>
                </div>

                {result.confidence < 90 && (
                  <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-xl mb-4">
                    <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0" />
                    <p className="text-yellow-800 font-medium">
                      Confidence below 90% detected. Please review the extracted data carefully for accuracy.
                    </p>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  onClick={() => handleEditClick(result)}
                  className="w-full h-12 text-lg font-semibold border-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300"
                >
                  Edit Details
                </Button>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={onConfirm} 
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
  )
} 