
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageSelected: (imageFile: File) => void;
}

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      
      // Pass the file to the parent component
      onImageSelected(file);
      
      toast.success('Image uploaded successfully');
    }
  }, [onImageSelected]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
  });
  
  const clearImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
  };
  
  return (
    <div className="w-full">
      {!previewImage ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive 
              ? 'border-eye-blue bg-eye-light-blue/30' 
              : 'border-eye-light-blue hover:border-eye-blue hover:bg-eye-light-blue/10'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-eye-blue mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload an Eye Image</h3>
          <p className="text-muted-foreground mb-2">
            Drag and drop an image here, or click to select a file
          </p>
          <p className="text-sm text-muted-foreground">
            Supported formats: JPG, PNG (Max size: 5MB)
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="aspect-video rounded-2xl overflow-hidden border border-eye-light-blue/50">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={clearImage}
            className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Remove image"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
