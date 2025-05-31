"use client"

import React, { useState } from "react"
import { Header } from "./_components/Header"
import { CameraCaptureCard } from "./_components/CameraCaptureCard"
import { FileUploadCard } from "./_components/FileUploadCard"
import { ProcessingState } from "./_components/ProcessingState"
import { UploadedFilesPreview } from "./_components/UploadedFilesPreview"
import { ScanResults } from "./_components/ScanResults"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

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

const Scan = () => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processingProgress, setProcessingProgress] = useState<number>(0)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [processingStage, setProcessingStage] = useState<string>("Initializing...")

  const processingStages = [
    "Initializing AI engine...",
    "Analyzing document structure...",
    "Extracting text content...",
    "Detecting financial data...",
    "Validating information...",
    "Finalizing results..."
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(files)
    startProcessing(files)
  }

  const handleCameraCapture = () => {
    setIsScanning(true)
    setProcessingProgress(0)
    simulateProcessing([{ name: "camera_capture.jpg" } as File])
  }

  const startProcessing = (files: File[]) => {
    setIsScanning(true)
    setProcessingProgress(0)
    simulateProcessing(files)
  }

  const simulateProcessing = (files: File[]) => {
    let currentStage = 0
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        const newProgress = prev + (Math.random() * 8 + 12)
        
        // Update processing stage
        const stageIndex = Math.floor((newProgress / 100) * processingStages.length)
        if (stageIndex < processingStages.length) {
          setProcessingStage(processingStages[stageIndex])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setProcessingStage("Complete!")
          
          // Mock scan results with enhanced data
          const mockResults: ScanResult[] = files.map((file, index) => ({
            id: index + 1,
            filename: file.name || `document_${index + 1}.jpg`,
            vendor: index === 0 ? "Golden Tech Solutions Inc." : "Premium Office Supplies Co.",
            amount: index === 0 ? 1250.0 : 245.67,
            date: "2024-01-15",
            category: index === 0 ? "Software & Technology" : "Office Supplies",
            confidence: Math.floor(Math.random() * 15 + 85),
            status: "extracted",
          }))
          
          setScanResults(mockResults)
          return 100
        }
        return newProgress
      })
    }, 150)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index))
  }

  const confirmResults = () => {
    // Enhanced success feedback
    setUploadedFiles([])
    setScanResults([])
    setProcessingProgress(0)
    setProcessingStage("Initializing...")
    
    toast.success("✨ Documents saved successfully and explore your ShweNet analysis.", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#10B981",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
      },
    })
    router.push('/dashboard')
  }

  const handleEditResults = (updatedResults: ScanResult[]) => {
    setScanResults(updatedResults)
    toast.success("Document details updated successfully!", {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#10B981",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />

        {!isScanning && scanResults.length === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CameraCaptureCard onCapture={handleCameraCapture} />
            <FileUploadCard onFileUpload={handleFileUpload} />
          </div>
        )}

        {isScanning && (
          <ProcessingState progress={processingProgress} stage={processingStage} />
        )}

        {uploadedFiles.length > 0 && !isScanning && (
          <UploadedFilesPreview 
            files={uploadedFiles}
            onRemoveFile={removeFile}
            onStartProcessing={() => startProcessing(uploadedFiles)}
          />
        )}

        {scanResults.length > 0 && (
          <ScanResults 
            results={scanResults}
            onConfirm={confirmResults}
            onEdit={handleEditResults}
          />
        )}
      </main>
    </div>
  )
}

export default Scan
