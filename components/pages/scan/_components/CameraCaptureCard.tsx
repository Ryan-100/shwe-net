import { Camera } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CameraCaptureCardProps {
  onCapture: () => void
}

export const CameraCaptureCard = ({ onCapture }: CameraCaptureCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="text-center relative z-10 pb-8">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
          <Camera className="h-10 w-10 text-white drop-shadow-lg" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          Camera Capture
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-3">
          Instantly capture receipts and invoices with your device camera for immediate processing
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <Button 
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
          onClick={onCapture}
        >
          <Camera className="h-5 w-5 mr-3" />
          Launch Camera
        </Button>
      </CardContent>
    </Card>
  )
} 