"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChefHat, Smartphone, Monitor, Scan, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Html5Qrcode } from "html5-qrcode"

export function Hero() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [scanError, setScanError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
        if (isScanning && !scannerRef.current) {
            try {
                const html5QrCode = new Html5Qrcode("reader")
                scannerRef.current = html5QrCode
                
                await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.777778
                    },
                    (decodedText) => {
                         // Success callback
                        if (isMounted) {
                             handleScanSuccess(decodedText)
                        }
                    },
                    (_errorMessage) => {
                        // Ignore scan errors as they happen every frame no QR is detected
                    }
                )
            } catch (err: any) {
                if (isMounted) {
                    if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                        setScanError("Camera access was denied. Please allow camera permissions.")
                    } else if (err.name === "NotFoundError") {
                         setScanError("No camera found on this device.")
                    } else {
                        setScanError("Failed to start camera. check permissions.")
                        console.error("Error starting scanner", err)
                    }
                    // Keep isScanning true so we can show the error UI
                }
            }
        }
    }

    if (isScanning) {
        setScanError(null)
        // Small delay to ensure DOM element exists
        setTimeout(startScanner, 100)
    } else {
        // Cleanup function for when scanning stops
        if (scannerRef.current) {
             scannerRef.current.stop().then(() => {
                 if (scannerRef.current) {
                    scannerRef.current.clear()
                    scannerRef.current = null
                 }
             }).catch(console.error)
        }
    }

    return () => {
        isMounted = false;
        if (scannerRef.current && scannerRef.current.isScanning) {
             scannerRef.current.stop().then(() => {
                 scannerRef.current?.clear()
             }).catch(console.error)
        }
    }
  }, [isScanning])

  const handleScanSuccess = async (decodedText: string) => {
      // Create a temporary anchor to parse the URL
      try {
        if (scannerRef.current) {
            await scannerRef.current.stop()
            scannerRef.current.clear()
            scannerRef.current = null
        }
        
        setIsScanning(false)

        // Determine if it's a URL or path
        if (decodedText.startsWith("http")) {
             // If it matches our current domain, we can use router.push, otherwise window.location
             const url = new URL(decodedText)
             if (url.origin === window.location.origin) {
                 router.push(url.pathname + url.search)
             } else {
                 window.location.href = decodedText
             }
        } else {
            // Assume it's a relative path
            router.push(decodedText)
        }
      } catch (error) {
           console.error("Navigation error after scan", error)
           setIsScanning(false)
      }
  }

  return (
    <section className="relative overflow-hidden pt-16 pb-32 lg:pt-32">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-3 py-1 text-sm text-muted-foreground mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Demo Available v2.0
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
          The Operating System for <br className="hidden md:block" />
          <span className="text-primary">Modern Hospitality</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Streamline every aspect of your restaurant. From QR code ordering to kitchen intelligence and simplified admin controls.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto" asChild>
            <Link href="/menu">
              <Smartphone className="mr-2 h-5 w-5" />
              Try Customer App
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto" asChild>
            <Link href="/manager/dashboard">
              <ChefHat className="mr-2 h-5 w-5" />
              Kitchen View
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="h-12 px-8 text-base w-full sm:w-auto" asChild>
            <Link href="/admin/overview">
              <Monitor className="mr-2 h-5 w-5" />
              Admin Panel
            </Link>
          </Button>
        </div>

        {/* Live Simulation Card */}
        <div className="bg-card border border-border rounded-xl p-2 max-w-3xl mx-auto shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="bg-muted/50 rounded-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Interactive Floor Simulation</h3>
                {isScanning && (
                    <Button variant="ghost" size="sm" onClick={() => setIsScanning(false)} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                    </Button>
                )}
              </div>
              
              {!isScanning ? (
                  <div className="text-center py-8">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Scan className="w-10 h-10 text-primary" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Scan to Order</h4>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                          Scan the QR code on your table to view the menu and place an order directly.
                      </p>
                      <Button onClick={() => setIsScanning(true)} size="lg" className="w-full sm:w-auto font-semibold">
                          <Scan className="mr-2 h-4 w-4" />
                          Launch Scanner
                      </Button>
                  </div>
              ) : (
                  <div className="relative overflow-hidden rounded-lg bg-black aspect-video flex flex-col items-center justify-center">
                        <div id="reader" className="w-full h-full"></div>
                        
                        {/* Error State */}
                        {scanError && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 p-6 text-center">
                                <div className="rounded-full bg-destructive/20 p-4 mb-4">
                                     <X className="w-8 h-8 text-destructive" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Camera Error</h3>
                                <p className="text-white/70 mb-6 max-w-xs">{scanError}</p>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => {
                                        setIsScanning(false)
                                        setScanError(null)
                                    }}
                                >
                                    Close Scanner
                                </Button>
                            </div>
                        )}
                        
                        {/* Overlay text - Only show if no error */}
                        {!scanError && (
                            <div className="absolute top-4 left-0 right-0 z-10 text-center pointer-events-none">
                                <div className="inline-block px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-sm font-medium">
                                    Point camera at QR code
                                </div>
                            </div>
                        )}

                        {/* Scanning Line Animation overlay - Only show if no error */}
                        {!scanError && (
                            <div className="absolute inset-0 border-2 border-primary/50 m-8 rounded-lg pointer-events-none z-10">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(var(--primary),0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                            </div>
                        )}
                  </div>
              )}
           </div>
        </div>

      </div>
    </section>
  )
}
