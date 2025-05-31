"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  ArrowLeft,
  Edit,
  Save,
  X,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle,
  Eye,
  ZoomIn,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock document data
const documentData = {
  id: 1,
  vendor: "Tech Solutions Inc.",
  amount: 1250.0,
  date: "2024-01-14",
  category: "Software",
  status: "pending",
  confidence: 85,
  type: "invoice",
  invoiceNumber: "INV-2024-001",
  description: "Annual software license renewal",
  taxAmount: 125.0,
  subtotal: 1125.0,
  paymentTerms: "Net 30",
  dueDate: "2024-02-13",
  notes: "Automatic renewal for team collaboration software",
  extractedFields: {
    vendor: { value: "Tech Solutions Inc.", confidence: 95 },
    amount: { value: 1250.0, confidence: 85 },
    date: { value: "2024-01-14", confidence: 90 },
    invoiceNumber: { value: "INV-2024-001", confidence: 88 },
  },
}

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(documentData)
  const [showOriginalImage, setShowOriginalImage] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to database
    setIsEditing(false)
    alert("Document updated successfully!")
  }

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "review":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/documents" className="flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2 text-gray-500" />
                <FileText className="h-8 w-8 text-blue-600" />
                <h1 className="ml-2 text-xl font-semibold text-gray-900">InvoiceTracker Pro</h1>
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Dashboard
              </Link>
              <Link href="/scan" className="text-gray-500 hover:text-gray-700">
                Scan
              </Link>
              <Link href="/documents" className="text-blue-600 font-medium">
                Documents
              </Link>
              <Link href="/settings" className="text-gray-500 hover:text-gray-700">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{formData.vendor}</h2>
              <p className="text-gray-600">Invoice #{formData.invoiceNumber}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(formData.status)}>{formData.status}</Badge>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Document Information</CardTitle>
                <CardDescription>Basic details extracted from the document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vendor">Vendor</Label>
                    {isEditing ? (
                      <Input
                        id="vendor"
                        value={formData.vendor}
                        onChange={(e) => handleFieldChange("vendor", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{formData.vendor}</p>
                        <span className={`text-sm ${getConfidenceColor(formData.extractedFields.vendor.confidence)}`}>
                          {formData.extractedFields.vendor.confidence}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    {isEditing ? (
                      <Input
                        id="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={(e) => handleFieldChange("invoiceNumber", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{formData.invoiceNumber}</p>
                        <span
                          className={`text-sm ${getConfidenceColor(formData.extractedFields.invoiceNumber.confidence)}`}
                        >
                          {formData.extractedFields.invoiceNumber.confidence}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    {isEditing ? (
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleFieldChange("date", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{formData.date}</p>
                        <span className={`text-sm ${getConfidenceColor(formData.extractedFields.date.confidence)}`}>
                          {formData.extractedFields.date.confidence}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    {isEditing ? (
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                      />
                    ) : (
                      <p className="font-medium">{formData.dueDate}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    {isEditing ? (
                      <Select value={formData.category} onValueChange={(value) => handleFieldChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Meals">Meals</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="font-medium">{formData.category}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    {isEditing ? (
                      <Select value={formData.status} onValueChange={(value) => handleFieldChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="review">Needs Review</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={getStatusColor(formData.status)}>{formData.status}</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Details */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Details</CardTitle>
                <CardDescription>Amount breakdown and payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="subtotal">Subtotal</Label>
                    {isEditing ? (
                      <Input
                        id="subtotal"
                        type="number"
                        step="0.01"
                        value={formData.subtotal}
                        onChange={(e) => handleFieldChange("subtotal", Number.parseFloat(e.target.value))}
                      />
                    ) : (
                      <p className="text-lg font-semibold">${formData.subtotal.toLocaleString()}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="taxAmount">Tax Amount</Label>
                    {isEditing ? (
                      <Input
                        id="taxAmount"
                        type="number"
                        step="0.01"
                        value={formData.taxAmount}
                        onChange={(e) => handleFieldChange("taxAmount", Number.parseFloat(e.target.value))}
                      />
                    ) : (
                      <p className="text-lg font-semibold">${formData.taxAmount.toLocaleString()}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="amount">Total Amount</Label>
                    {isEditing ? (
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => handleFieldChange("amount", Number.parseFloat(e.target.value))}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-green-600">${formData.amount.toLocaleString()}</p>
                        <span className={`text-sm ${getConfidenceColor(formData.extractedFields.amount.confidence)}`}>
                          {formData.extractedFields.amount.confidence}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  {isEditing ? (
                    <Input
                      id="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={(e) => handleFieldChange("paymentTerms", e.target.value)}
                    />
                  ) : (
                    <p className="font-medium">{formData.paymentTerms}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description and Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Description & Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleFieldChange("description", e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700">{formData.description}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  {isEditing ? (
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleFieldChange("notes", e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700">{formData.notes}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Document Preview</CardTitle>
                <CardDescription>Original scanned document</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=300&width=200"
                    alt="Document preview"
                    width={200}
                    height={300}
                    className="w-full border rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setShowOriginalImage(true)}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Size
                </Button>
              </CardContent>
            </Card>

            {/* Extraction Confidence */}
            <Card>
              <CardHeader>
                <CardTitle>Extraction Quality</CardTitle>
                <CardDescription>AI confidence levels for extracted data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Confidence</span>
                  <span className={`font-semibold ${getConfidenceColor(formData.confidence)}`}>
                    {formData.confidence}%
                  </span>
                </div>

                {formData.confidence < 90 && (
                  <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Review Recommended</p>
                      <p className="text-xs text-yellow-700">
                        Some fields have low confidence. Please verify the extracted data.
                      </p>
                    </div>
                  </div>
                )}

                {formData.confidence >= 90 && (
                  <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">High Quality Extraction</p>
                      <p className="text-xs text-green-700">All fields extracted with high confidence.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export to PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export to CSV
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Duplicate Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
