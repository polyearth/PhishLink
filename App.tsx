import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Shield className="w-16 h-16 text-blue-600" />
            <h1 className="text-5xl font-bold text-blue-600">PhishGuard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Protecting you from phishing attacks with advanced detection and real-time warnings
          </p>
        </header>

        <main className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <ShieldCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Real-time Protection</h2>
            <p className="text-gray-600">
              Continuous monitoring of websites you visit to detect potential phishing attempts
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Smart Detection</h2>
            <p className="text-gray-600">
              Advanced algorithms to identify suspicious patterns and malicious websites
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <ShieldAlert className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Instant Alerts</h2>
            <p className="text-gray-600">
              Immediate warnings when potentially dangerous sites are detected
            </p>
          </div>
        </main>

        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">How to Use PhishGuard</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <ol className="text-left space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</span>
                <span>Install the PhishGuard extension from the Chrome Web Store</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</span>
                <span>Browse the web as normal - PhishGuard runs silently in the background</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</span>
                <span>Get instant alerts if you encounter suspicious websites</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</span>
                <span>Click the extension icon anytime to check website safety status</span>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;