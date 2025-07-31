// File: utils/fileUploadUtils.ts
// Utility functions for drag-and-drop and file input handling in upload areas

import { Dispatch, SetStateAction } from "react";

/**
 * Handles file input selection (e.g., upload, preview, etc.).
 */
export function handleFiles(files: FileList | null) {
  if (files && files.length > 0) {
    // Example: handle the uploaded file(s) here (e.g., upload, preview, etc.)
    // You can replace this with your actual upload/preview logic
  }
}

/**
 * Handles drag events for file upload areas.
 */
export function handleDrag(
  e: React.DragEvent<HTMLDivElement>,
  setDragActive: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
}

/**
 * Handles drop events for file upload areas.
 */
export function handleDrop(
  e: React.DragEvent<HTMLDivElement>,
  setDragActive: Dispatch<SetStateAction<boolean>>,
  handleFilesFn: (files: FileList | null) => void
) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFilesFn(e.dataTransfer.files);
  }
}
