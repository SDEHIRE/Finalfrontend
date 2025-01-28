import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';

const ImageCapture = ({ isCapturing }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  useEffect(() => {
    let stream = null;
    let captureInterval = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsVideoActive(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (captureInterval) {
        clearInterval(captureInterval);
      }
      setIsVideoActive(false);
    };

    if (isCapturing) {
      startCamera();
      captureInterval = setInterval(captureAndAnalyze, 5000); // Capture every 5 seconds
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isCapturing]);

  const captureAndAnalyze = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        await sendToBackend(imageDataUrl);
      }
    }
  };

  const sendToBackend = async (imageDataUrl) => {
    const imageFile = dataURLToFile(imageDataUrl, 'captured-image.jpg');
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post('https://main-emotion-capture.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEmotion(response.data.dominant_emotion);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const dataURLToFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Draggable>
      <div className="fixed bottom-4 right-4 bg-white p-2 rounded-lg shadow-md cursor-move">
        {isCapturing ? (
          <video ref={videoRef} width="200" height="150" autoPlay muted />
        ) : (
          <div className="relative w-[200px] h-[150px]">
            
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
              <p className="text-white text-center text-sm px-2">
                Your video will appear here when capturing starts
              </p>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} width="200" height="150" style={{ display: 'none' }} />
        {emotion && (
          <div className="mt-2 text-sm">
           
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ImageCapture;

