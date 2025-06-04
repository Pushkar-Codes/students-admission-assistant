"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function UploadTemplates() {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [whatsappText, setWhatsappText] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!bannerFile && !whatsappText && !pdfFile) {
      toast.error("Please add at least one template to upload.");
      return;
    }

    const formData = new FormData();
    if (bannerFile) formData.append("banner", bannerFile);
    if (pdfFile) formData.append("pdf", pdfFile);
    formData.append("whatsappText", whatsappText);

    try {
      // TODO: Replace with actual API call
      console.log("Uploading templates...");
      toast.success("Templates uploaded successfully!");
      setBannerFile(null);
      setWhatsappText("");
      setPdfFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload templates.");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Templates</CardTitle>
        <p className="text-gray-500 text-sm">
          Upload WhatsApp text, banner images, and PDFs to share with staff or
          students.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="banner">Banner Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
          />
          {bannerFile && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {bannerFile.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp Text</Label>
          <Textarea
            id="whatsapp"
            value={whatsappText}
            onChange={(e) => setWhatsappText(e.target.value)}
            placeholder="Enter message content..."
          />
        </div>

        <div>
          <Label htmlFor="pdf">Upload PDF</Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          />
          {pdfFile && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {pdfFile.name}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} className="ml-auto">
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
}
