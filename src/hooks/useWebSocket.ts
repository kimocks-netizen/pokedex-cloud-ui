'use client';

import { useEffect, useRef, useState } from 'react';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'wss://25j9z0keyc.execute-api.af-south-1.amazonaws.com/dev';

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    try {
      ws.current = new WebSocket(WEBSOCKET_URL);

      ws.current.onopen = () => {
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setLastMessage(message);
        } catch (e) {
          // Ignore parse errors
        }
      };

      ws.current.onerror = () => {
        setIsConnected(false);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
      };
    } catch (e) {
      setIsConnected(false);
    }

    return () => {
      ws.current?.close();
    };
  }, []);

  return { isConnected, lastMessage };
}
