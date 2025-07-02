import { Eye, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProcessingStateProps {
  progress: number
  stage: string
  friendlyMessage?: string
}

export const ProcessingState = ({ progress, stage, friendlyMessage }: ProcessingStateProps) => {
  return (
    <Card className="mb-12 bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-orange-500/20 animate-pulse"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center text-2xl">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mr-4">
            <Loader2 className="h-5 w-5 text-white animate-spin" />
          </div>
          Processing Documents
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 ml-12">
          Our AI is analyzing your documents with advanced machine learning algorithms
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          <div className="relative">
            <Progress 
              value={progress} 
              className="w-full h-4 bg-gradient-to-r from-amber-100 to-yellow-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-20 animate-pulse"></div>
          </div>
          {friendlyMessage && (
            <div className="text-center text-amber-700 text-lg font-semibold animate-pulse">
              {friendlyMessage}
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-amber-600 animate-pulse" />
              <span className="text-lg font-medium text-gray-700">{stage}</span>
            </div>
            <span className="text-2xl font-bold text-amber-600">{Math.round(progress)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 