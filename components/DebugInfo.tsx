'use client'

import { useState } from 'react'

export function DebugInfo() {
  const [showDebug, setShowDebug] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const getDebugInfo = () => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      connection: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt
      } : 'Not available',
      screen: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight
      },
      window: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight
      },
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    setDebugInfo(info)
  }

  if (!showDebug) {
    return (
      <button
        onClick={() => {
          setShowDebug(true)
          getDebugInfo()
        }}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-xs z-50"
      >
        Debug Info
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Debug Information</h3>
          <button
            onClick={() => setShowDebug(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {debugInfo && (
          <div className="text-xs space-y-2">
            <div>
              <strong>User Agent:</strong>
              <div className="break-all bg-gray-100 p-2 rounded mt-1">
                {debugInfo.userAgent}
              </div>
            </div>
            
            <div>
              <strong>Platform:</strong> {debugInfo.platform}
            </div>
            
            <div>
              <strong>Language:</strong> {debugInfo.language}
            </div>
            
            <div>
              <strong>Online:</strong> {debugInfo.onLine ? 'Yes' : 'No'}
            </div>
            
            <div>
              <strong>Cookies Enabled:</strong> {debugInfo.cookieEnabled ? 'Yes' : 'No'}
            </div>
            
            <div>
              <strong>Screen Size:</strong> {debugInfo.screen.width} × {debugInfo.screen.height}
            </div>
            
            <div>
              <strong>Window Size:</strong> {debugInfo.window.innerWidth} × {debugInfo.window.innerHeight}
            </div>
            
            <div>
              <strong>Timezone:</strong> {debugInfo.timezone}
            </div>
            
            <div>
              <strong>Timestamp:</strong> {debugInfo.timestamp}
            </div>
            
            {debugInfo.connection !== 'Not available' && (
              <div>
                <strong>Connection:</strong>
                <div className="ml-2">
                  <div>Type: {debugInfo.connection.effectiveType}</div>
                  <div>Downlink: {debugInfo.connection.downlink} Mbps</div>
                  <div>RTT: {debugInfo.connection.rtt} ms</div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 space-y-2">
          <button
            onClick={() => {
              if (debugInfo) {
                navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2))
                alert('Debug info copied to clipboard!')
              }
            }}
            className="w-full bg-blue-500 text-white py-2 rounded text-sm"
          >
            Copy to Clipboard
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-green-500 text-white py-2 rounded text-sm"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  )
} 