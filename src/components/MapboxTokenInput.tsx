import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MapboxTokenInputProps {
  onTokenSubmit: (token: string) => void;
}

const MapboxTokenInput = ({ onTokenSubmit }: MapboxTokenInputProps) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenSubmit(token.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Key className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mapbox API Token Required</h1>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to enable the map features
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Get your free token at{' '}
            <a
              href="https://mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              mapbox.com
            </a>
            . Create an account and find your token in the Tokens section.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono text-xs"
            />
          </div>

          <Button type="submit" className="w-full" disabled={!token.trim()}>
            Start Tracking
          </Button>
        </form>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>Your token is only stored in your browser session</p>
          <p>It will not be saved or sent to any server</p>
        </div>
      </Card>
    </div>
  );
};

export default MapboxTokenInput;
