import { FileText, X, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UploadedFilesPreviewProps {
  files: File[]
  onRemoveFile: (index: number) => void
  onStartProcessing: () => void
}

export const UploadedFilesPreview = ({ files, onRemoveFile, onStartProcessing }: UploadedFilesPreviewProps) => {
  return (
    <Card className="mb-12 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <FileText className="h-6 w-6 mr-3 text-amber-600" />
          Uploaded Files
        </CardTitle>
        <CardDescription>Files ready for AI-powered analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-amber-200 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for processing</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemoveFile(index)}
                className="hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
          <Button 
            onClick={onStartProcessing}
            className="w-full h-12 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="h-5 w-5 mr-2" />
            Start AI Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 