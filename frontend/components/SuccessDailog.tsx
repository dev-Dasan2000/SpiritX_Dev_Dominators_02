"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type IconType = "success" | "warning" | "error";

interface SuccessDialogProps {
  iconType: IconType;
  message: string;
  subMessage: string;
  showProgressBar?: boolean;
  redirect: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  iconType,
  message,
  subMessage,
  showProgressBar = false,
  redirect,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (showProgressBar) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [showProgressBar]);

  useEffect(() => {
    if (currentProgress === 100) {
      window.location.href = redirect;
    }
  }, [currentProgress, redirect]);

  const getIcon = (type: IconType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-10 h-10 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
      case "error":
        return <XCircle className="w-10 h-10 text-red-500" />;
      default:
        return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent  bg-opacity-50 backdrop-blur-md z-50 transition-opacity duration-300">
      <div className="relative bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-2xl w-[350px] p-5 shadow-lg">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          {getIcon(iconType)}
        </div>
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold text-white">{message}</h2>
          <p className="mt-1 text-gray-400 text-sm">{subMessage}</p>
        </div>
        {showProgressBar && (
          <div className="mt-4">
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessDialog;
