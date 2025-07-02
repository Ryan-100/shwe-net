import { Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

interface FileUploadCardProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  fileUploaded?: boolean
}

export const FileUploadCard = ({ onFileUpload, fileUploaded = false }: FileUploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="text-center relative z-10 pb-8">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
          <Upload className="h-10 w-10 text-white drop-shadow-lg" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
          File Upload
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-3">
          Upload multiple images or PDFs from your device for batch processing and analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          accept="image/*,application/pdf"
          disabled={fileUploaded}
          className="hidden"
        />
        {fileUploaded && (
          <p className="text-amber-600 font-semibold">Only one file can be uploaded at a time.</p>
        )}
        <Button 
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-5 w-5 mr-3" />
          Choose Files
        </Button>
      </CardContent>
    </Card>
  )
} 