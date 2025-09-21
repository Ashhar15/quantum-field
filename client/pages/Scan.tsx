import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Scan() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scanResult) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false,
    );

    const onScanSuccess = (result: string) => {
      scanner.clear().then(() => {
        setScanResult(result);
      }).catch(console.error);
    };

    const onScanError = (error: any) => {
      console.warn("QR Scan Error:", error);
    };

    scanner.render(onScanSuccess, onScanError);

    return () => {
      // Ensure scanner is cleared on component unmount
      if (document.getElementById("reader")) {
        scanner.clear().catch((error) => {
          console.error("Failed to clear scanner on unmount:", error);
        });
      }
    };
  }, [scanResult]);

  return (
    <div className="min-h-screen bg-[#ffebee] flex flex-col items-center justify-start p-6 text-center relative overflow-hidden">
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <img src="https://api.builder.io/api/v1/image/assets/TEMP/6e371d1d09eabe84f6062dc9b95155b2b439e73e?width=304" alt="AttendAce Logo" className="h-12 w-auto mix-blend-darken" />
      </div>

      <div className="w-full max-w-md mx-auto mt-24">
        {scanResult ? (
          <div className="bg-white p-8 rounded-xl shadow-lg animate-in fade-in-50">
            <h1 className="text-3xl font-serif text-green-600 mb-4">
              Attendance Recorded!
            </h1>
            <p className="text-md mt-2 break-all text-gray-600">
              Scanned Data: <a href={scanResult} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors">{scanResult}</a>
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-8 bg-attend-blue text-white font-inter text-lg px-8 py-3 rounded-full hover:bg-attend-blue-dark transition-all shadow-md"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-serif mb-8 text-gray-800">
              Scan QR for Attendance
            </h1>
            <div className="relative w-full max-w-xs mx-auto aspect-square bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center p-2 overflow-hidden">
              <div id="reader" className="w-[300px] h-[300px]"></div>
              <div className="absolute inset-0 p-6 pointer-events-none">
                <div className="w-full h-full relative">
                  {/* Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gray-700 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gray-700 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gray-700 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gray-700 rounded-br-lg"></div>
                  {/* Scanning Line */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-400/70 shadow-[0_0_10px_#2997ff,0_0_20px_#2997ff] animate-scan-line"></div>
                </div>
              </div>
            </div>
            <p className="text-5xl font-serif mt-10 text-blue-600 animate-pulse">
              Scanning
            </p>
            <div className="mt-4 flex justify-center space-x-2 animate-pulse">
                <span className="sr-only">Loading...</span>
                <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                <div className="h-4 w-4 bg-blue-500 rounded-full animation-delay-300"></div>
                <div className="h-4 w-4 bg-blue-500 rounded-full animation-delay-500"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}