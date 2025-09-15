'use client';

import { useState } from 'react';

/**
 * F1-themed Contact Section with Web3Forms integration
 * 
 * Setup Instructions:
 * 1. Go to https://web3forms.com
 * 2. Sign up for a free account
 * 3. Create a new form and copy your Access Key
 * 4. Replace "YOUR_ACCESS_KEY_HERE" below with your actual access key
 * 5. Customize the redirect URL if needed
 * 
 * Features:
 * - F1 racing-themed UI with pit crew communications style
 * - Real-time status updates (STANDBY, RECEIVING, TRANSMITTING, etc.)
 * - Success/failure handling with appropriate racing terminology
 * - Spam protection with botcheck honeypot field
 */

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [radioStatus, setRadioStatus] = useState('STANDBY');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (value.length > 0 && radioStatus === 'STANDBY') {
      setRadioStatus('RECEIVING');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRadioStatus('TRANSMITTING');
    
    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      
      // Add additional context to help with spam detection
      formData.append('website', 'Ammar Faisal Portfolio');
      formData.append('source', 'Portfolio Contact Form');
      formData.append('_template', 'table');
      formData.append('_autoresponse', 'false');
      formData.append('_subject', `New message from ${formData.get('name')} - Portfolio Contact`);
      formData.append('from_name', formData.get('name') as string);
      formData.append('replyto', formData.get('email') as string);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setRadioStatus('MESSAGE_SENT');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setRadioStatus('STANDBY'), 4000);
      } else {
        console.log('Web3Forms Error Response:', data);
        console.log('Error Message:', data.message);
        
        // Check for specific spam-related errors
        if (data.message && data.message.toLowerCase().includes('spam')) {
          console.log('Message flagged as spam. Try using different content or enabling captcha.');
        }
        
        setRadioStatus('TRANSMISSION_FAILED');
        setTimeout(() => setRadioStatus('STANDBY'), 3000);
      }
    } catch (error) {
      console.log('Error', error);
      setRadioStatus('TRANSMISSION_FAILED');
      setTimeout(() => setRadioStatus('STANDBY'), 3000);
    }
  };

  const contactMethods = [
    {
      channel: 'PRIMARY_COMM',
      type: 'Email',
      value: 'ammarfaisal5002@gmail.com',
      icon: '📧',
      status: 'ACTIVE',
      frequency: '24/7'
    },
    {
      channel: 'BACKUP_COMM',
      type: 'LinkedIn',
      value: 'linkedin.com/in/ammar9faisal/',
      icon: '📱',
      status: 'ACTIVE',
      frequency: '9-17 UTC'
    },
    {
      channel: 'LOCATION',
      type: 'Base',
      value: 'Toronto, Canada',
      icon: '📍',
      status: 'CONFIRMED',
      frequency: 'GMT+5'
    }
  ];

  const socialLinks = [
    { platform: 'GitHub', icon: '🐙', handle: '@ammar9faisal', url: 'https://github.com/Ammar9faisal' },
    { platform: 'LinkedIn', icon: '💼', handle: '@ammar9faisal', url: 'https://linkedin.com/in/ammar9faisal/' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'STANDBY': return 'text-yellow-400';
      case 'RECEIVING': return 'text-blue-400';
      case 'TRANSMITTING': return 'text-red-400 animate-pulse';
      case 'MESSAGE_SENT': return 'text-green-400';
      case 'TRANSMISSION_FAILED': return 'text-red-600 animate-pulse';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide font-mono">
            PIT CREW <span className="text-red-500">COMMUNICATIONS</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl">Ready for your next project? Let&apos;s establish radio contact!</p>
          <div className="w-24 sm:w-32 h-1 bg-red-500 mx-auto mt-4 sm:mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Communication Channels */}
          <div className="space-y-6 sm:space-y-8">
            {/* Radio Status Panel */}
            <div className="bg-black rounded-2xl p-4 sm:p-6 border border-red-600">
              <div className="flex items-center justify-between mb-4 flex-col sm:flex-row space-y-2 sm:space-y-0">
                <h3 className="text-white font-bold text-lg sm:text-xl font-mono">📡 RADIO STATUS</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">ONLINE</span>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono text-sm">TRANSMISSION:</span>
                  <span className={`font-mono text-sm font-bold ${getStatusColor(radioStatus)}`}>
                    {radioStatus.replace('_', ' ')}
                  </span>
                </div>
                
                {/* Status Messages */}
                {radioStatus === 'MESSAGE_SENT' && (
                  <div className="mt-2 p-2 bg-green-900/50 rounded border border-green-600">
                    <p className="text-green-400 text-xs font-mono">✅ Mission briefing received! Pit crew will respond within 24 hours.</p>
                  </div>
                )}
                
                {radioStatus === 'TRANSMISSION_FAILED' && (
                  <div className="mt-2 p-2 bg-red-900/50 rounded border border-red-600">
                    <p className="text-red-400 text-xs font-mono">❌ Transmission failed! Check connection and retry mission launch.</p>
                  </div>
                )}
                
                {/* Signal Strength Indicator */}
                <div className="mt-3 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-6 rounded ${
                        i < (radioStatus === 'TRANSMITTING' ? 5 : radioStatus === 'RECEIVING' ? 3 : 2)
                          ? 'bg-green-400'
                          : 'bg-gray-700'
                      }`}
                      style={{ height: `${(i + 1) * 4 + 8}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg sm:text-xl font-mono mb-4 sm:mb-6">🎯 COMMUNICATION CHANNELS</h3>
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-red-500 transition-colors">
                  <div className="flex items-center justify-between mb-3 flex-col sm:flex-row space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <span className="text-xl sm:text-2xl">{method.icon}</span>
                      <div>
                        <div className="text-gray-400 font-mono text-xs">{method.channel}</div>
                        <div className="text-white font-semibold text-sm sm:text-base">{method.type}</div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <div className="text-green-400 font-mono text-xs">{method.status}</div>
                      <div className="text-gray-500 font-mono text-xs">{method.frequency}</div>
                    </div>
                  </div>
                  <div className="text-red-400 font-mono font-semibold text-sm break-all">{method.value}</div>
                </div>
              ))}
            </div>

            {/* Social Racing Team */}
            <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-700">
              <h4 className="text-white font-bold text-base sm:text-lg font-mono mb-4">🏁 RACING TEAM SOCIAL</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="flex items-center space-x-3 p-3 bg-black/50 rounded-lg hover:bg-red-600/20 hover:border-red-500 border border-gray-700 transition-all duration-300"
                  >
                    <span className="text-lg sm:text-xl">{social.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{social.platform}</div>
                      <div className="text-gray-400 font-mono text-xs truncate">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-start sm:items-center space-x-3">
                <div className="w-4 h-4 bg-green-300 rounded-full animate-ping flex-shrink-0 mt-1 sm:mt-0"></div>
                <div>
                  <h4 className="text-white font-bold text-base sm:text-lg">🟢 DRIVER STATUS: AVAILABLE</h4>
                  <p className="text-green-100 text-sm">Ready to race on new projects • Response time: 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Control Form */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 sm:p-6 lg:p-8 border border-red-600">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-2xl sm:text-3xl">🎮</span>
              <div>
                <h3 className="text-white font-bold text-xl sm:text-2xl font-mono">MISSION CONTROL</h3>
                <p className="text-gray-400 font-mono text-sm">Initialize project transmission</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Web3Forms Access Key */}
              <input 
                type="hidden" 
                name="access_key" 
                value={"92ae1c2a-37a8-490f-a179-6e345d975b22"} 
              />
              
              {/* Enhanced spam protection and configuration */}
              <input type="hidden" name="subject" value="New Contact from F1 Portfolio" />
              <input type="hidden" name="from_name" value="Ammar Faisal Portfolio" />
              
              {/* Improved spam protection */}
              <input type="hidden" name="captcha" value="true" />
              <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} tabIndex={-1} />
              
              {/* Honeypot field - invisible to users but bots will fill it */}
              <input 
                type="text" 
                name="website" 
                className="hidden" 
                style={{display: 'none'}} 
                tabIndex={-1} 
                autoComplete="off"
              />
              
              {/* Additional anti-spam measures */}
              <input type="hidden" name="replyto" value={formData.email} />
              <input type="hidden" name="cc" value="ammarfaisal5002@gmail.com" />
              
              <div>
                <label className="block text-red-400 font-mono text-sm font-semibold mb-2">
                  DRIVER_NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm sm:text-base"
                  placeholder="Enter pilot identification..."
                  required
                />
              </div>

              <div>
                <label className="block text-red-400 font-mono text-sm font-semibold mb-2">
                  COMM_FREQUENCY
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm sm:text-base"
                  placeholder="pilot@racingteam.com"
                  required
                />
              </div>

              <div>
                <label className="block text-red-400 font-mono text-sm font-semibold mb-2">
                  MISSION_TYPE
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm sm:text-base"
                  placeholder="Project classification..."
                  required
                />
              </div>

              <div>
                <label className="block text-red-400 font-mono text-sm font-semibold mb-2">
                  MISSION_BRIEFING
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-black border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono resize-none text-sm sm:text-base"
                  placeholder="Transmit project specifications and race objectives..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={radioStatus === 'TRANSMITTING'}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 font-mono text-sm sm:text-base"
              >
                {radioStatus === 'TRANSMITTING' ? '📡 TRANSMITTING...' : 
                 radioStatus === 'MESSAGE_SENT' ? '✅ TRANSMISSION COMPLETE' :
                 radioStatus === 'TRANSMISSION_FAILED' ? '❌ TRANSMISSION FAILED - RETRY' :
                 '🏁 LAUNCH MISSION'}
              </button>
            </form>

            {/* Response Time Display */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-black/50 rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="text-gray-400 text-sm font-mono">EXPECTED RESPONSE TIME</div>
                <div className="text-red-400 font-bold font-mono text-base sm:text-lg">⚡ 24 HOURS</div>
                <div className="text-gray-500 text-xs font-mono">Average pit stop efficiency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Racing Footer */}
        <div className="mt-12 sm:mt-16 text-center border-t border-gray-700 pt-6 sm:pt-8">
          <div className="mb-4">
            <div className="text-gray-400 font-mono text-sm">
              © 2024 Ammar Faisal Racing Team • All rights reserved
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-2 sm:space-x-4">
            <div className="w-12 sm:w-20 h-1 bg-red-500"></div>
            <span className="text-white font-mono text-xs sm:text-sm">PORTFOLIO</span>
            <div className="w-12 sm:w-20 h-1 bg-red-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
