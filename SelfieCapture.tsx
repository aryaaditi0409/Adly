import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useRef, useEffect } from "react";
import { getContract } from "./utils/contractUtils";
import { ethers } from "ethers";

export interface SelfieCaptureProps {
  productId: number;
  shouldCapture: boolean;
  apiKey: string;
  productIndex: number;
  companyAddress: string;
  onRating: (rating: number) => void;
}

const SelfieCapture: React.FC<SelfieCaptureProps> = ({
  productIndex,
  shouldCapture,
  apiKey,
  companyAddress,
}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraStatus, setCameraStatus] = useState<string>("initializing");
  const [contractStatus, setContractStatus] = useState<string>("");
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      setCameraStatus("requesting");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setCameraStatus("ready");
          videoRef.current
            ?.play()
            .then(() => {
              console.log("Camera started successfully");
            })
            .catch((err) => {
              setError(`Failed to play video: ${err.message}`);
              console.error("Error playing video:", err);
            });
        };
      }
    } catch (err) {
      const error = err as Error;
      setError(`Camera access error: ${error.message}`);
      setCameraStatus("error");
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = () => {
    if (cameraStatus !== "ready") {
      setError("Camera not ready for capture");
      return;
    }

    setIsCapturing(true);

    if (!videoRef.current || !canvasRef.current) {
      setError("Video or canvas reference not available");
      setIsCapturing(false);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      setError("Could not get canvas context");
      setIsCapturing(false);
      return;
    }

    try {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image as base64 data URL
      const imageData = canvas.toDataURL("image/png");

      console.log("Image captured successfully");
      setCapturedImage(imageData);

      // Send the captured image to the Gemini API
      sendToGeminiAPI(imageData);
      console.log("Image sent to Gemini API");
    } catch (err) {
      const error = err as Error;
      setError(`Capture error: ${error.message}`);
      setIsCapturing(false);
      console.error("Error capturing image:", err);
    }
  };

  const sendToGeminiAPI = async (imageData: string) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "models/gemini-1.5-pro",
      });
      const imageResp = await fetch(imageData).then((res) => res.blob());

      const result = await model.generateContent([
        {
          inlineData: {
            data: Buffer.from(await imageResp.arrayBuffer()).toString("base64"),
            mimeType: "image/jpeg",
          },
        },
        "Rate the product out of 10 using the expression in the image. Just give the rating. Nothing else. Just give me a single number.",
      ]);

      console.log("Gemini response:", result.response.text());
      // Extract numeric rating, with validation
      const ratingText = result.response.text().trim();
      const rating = parseInt(ratingText, 10);
      console.log(rating);

      // Validate rating
      if (isNaN(rating) || rating < 1 || rating > 10) {
        throw new Error(`Invalid rating received: ${ratingText}`);
      }

      setApiResponse(rating);
      await storeRatingInContract(rating);
    } catch (err) {
      const error = err as Error;
      setError(`Gemini API error: ${error.message}`);
      setIsCapturing(false);
      console.error("Error processing with Gemini API:", err);
    }
  };

  const checkProductExists = async () => {
    try {
      const contract = await getContract();

      // Try to read product data before submitting transaction
      const companyProducts = await contract.getCompanyProducts(companyAddress);

      // Log for debugging
      console.log("Company products:", companyProducts);

      // Check if productIndex is valid
      if (!companyProducts || productIndex >= companyProducts.length) {
        return {
          exists: false,
          message: `Product index ${productIndex} out of bounds. Company has ${
            companyProducts ? companyProducts.length : 0
          } products.`,
        };
      }

      return { exists: true, productInfo: companyProducts[productIndex] };
    } catch (err) {
      console.error("Error checking product:", err);
      return {
        exists: false,
        message: "Error checking product existence",
        error: err,
      };
    }
  };

  const storeRatingInContract = async (rating: number) => {
    try {
      // First, verify input parameters
      if (!companyAddress || !ethers.utils.isAddress(companyAddress)) {
        throw new Error(`Invalid company address: ${companyAddress}`);
      }

      if (productIndex === undefined || productIndex < 0) {
        throw new Error(`Invalid product index: ${productIndex}`);
      }

      setContractStatus("Connecting to contract...");
      const contract = await getContract();

      if (!contract || !contract.signer) {
        throw new Error("Failed to connect to contract or missing signer");
      }

      // Check if the signer is connected
      const signerAddress = await contract.signer.getAddress();
      console.log("Connected wallet address:", signerAddress);

      setContractStatus("Checking product...");
      // Check if product exists before attempting to rate
      const productCheck = await checkProductExists();
      setDebugInfo(productCheck);

      if (!productCheck.exists) {
        throw new Error(productCheck.message || "Product does not exist");
      }

      // Log parameters for debugging
      console.log("Parameters for rateProduct:", {
        companyAddress,
        productIndex: Number(productIndex), // Ensure it's a number
        rating,
      });

      setContractStatus("Sending transaction...");

      // Try calling with BigNumber for productIndex
      const productIndexBN = ethers.BigNumber.from(productIndex);

      // Send with explicit gas settings
      const tx = await contract.rateProduct(
        companyAddress,
        productIndexBN, // Use BigNumber
        rating,
        {
          gasLimit: 500000, // Increased gas limit
          gasPrice: ethers.utils.parseUnits("50", "gwei"), // Explicit gas price
        }
      );

      setContractStatus("Waiting for confirmation...");
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      setContractStatus("Rating stored successfully!");
    } catch (err: any) {
      // Enhanced error logging
      console.error("Transaction failed:", err);

      let errorMessage = "Unknown error";

      // Try to extract more detailed error message
      if (err.error && err.error.message) {
        errorMessage = err.error.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Check for specific revert reasons
      if (errorMessage.includes("revert")) {
        const revertReason =
          errorMessage.split("reverted: ")[1] || "Unknown revert reason";
        errorMessage = `Contract reverted: ${revertReason}`;
      }

      setError(`Contract error: ${errorMessage}`);
      setContractStatus(`Failed: ${errorMessage}`);
    }
  };

  // Start the camera when the component mounts
  useEffect(() => {
    startCamera();

    // Clean up when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture image when shouldCapture becomes true
  useEffect(() => {
    if (shouldCapture && cameraStatus === "ready" && !isCapturing) {
      // Small delay to ensure camera is fully initialized
      setTimeout(() => {
        captureImage();
      }, 1000);
    }
  }, [shouldCapture, cameraStatus]);

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs p-1 rounded">
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        className="relative top-0 right-0 w-20 rounded border border-gray-300"
        autoPlay
        playsInline
        muted
      />

      {contractStatus && (
        <div className="absolute bottom-0 left-0 text-xs p-1 rounded bg-blue-100 text-blue-800">
          {contractStatus}
        </div>
      )}

      {debugInfo && (
        <div className="hidden">
          {/* This div holds debug info but is hidden from UI */}
          Debug: {JSON.stringify(debugInfo)}
        </div>
      )}

      {/* Hidden canvas element for capturing frames */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default SelfieCapture;
