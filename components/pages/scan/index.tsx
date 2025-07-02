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
import { useDocumentVerification } from "@/features/base/services/mutation"
import { InvoiceResponse, ReceiptResponse } from "@/features/base/types"

const Scan = () => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processingProgress, setProcessingProgress] = useState<number>(0)
  const [scanResult, setScanResult] = useState<InvoiceResponse | ReceiptResponse | null>(null)
  const [processingStage, setProcessingStage] = useState<string>("Initializing...")
  const { mutateAsync: verifyDocument } = useDocumentVerification();

  const processingStages = [
    "Initializing AI engine...",
    "Analyzing document structure...",
    "Extracting text content...",
    "Detecting financial data...",
    "Validating information...",
    "Finalizing results..."
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setUploadedFiles([files[0]]); // Only allow one file
      // Do NOT call startProcessing here
    }
  }

  const handleCameraCapture = () => {
    setIsScanning(true)
    setProcessingProgress(0)
    startProcessing([{ name: "camera_capture.jpg" } as File])
  }

  const startProcessing = async (files: File[]) => {
    setIsScanning(true);
    setProcessingProgress(0);
    setProcessingStage("Uploading and verifying...");
    try {
      const response = await verifyDocument({ file: files[0] });
      if (response) setScanResult(response as InvoiceResponse | ReceiptResponse);
      setIsScanning(false);
      setProcessingStage("Complete!");
    } catch (error) {
      setIsScanning(false);
      setProcessingStage("Error during verification");
      // Optionally show error toast
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index))
  }

  const confirmResults = () => {
    // Enhanced success feedback
    setUploadedFiles([])
    setScanResult(null)
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
  }

  const handleEditResults = (updatedResult: InvoiceResponse | ReceiptResponse) => {
    setScanResult(updatedResult);
    toast.success("Document details updated successfully!", {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#10B981",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
      },
    });
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

        {!isScanning && !scanResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CameraCaptureCard onCapture={handleCameraCapture} />
            <FileUploadCard onFileUpload={handleFileUpload} fileUploaded={uploadedFiles.length > 0} />
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

        {scanResult && (
          <ScanResults 
            result={scanResult}
            onConfirm={confirmResults}
            onEdit={handleEditResults}
          />
        )}
      </main>
    </div>
  )
}

export default Scan
