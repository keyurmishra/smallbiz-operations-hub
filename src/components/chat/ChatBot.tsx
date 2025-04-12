
import React, { useState } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Hello! I\'m your Zoho Invoice assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = {
        "invoice": "You can create a new invoice by clicking the 'New Invoice' button on the homepage or going to the Invoices section.",
        "customer": "To add a new customer, use the 'New Customer' button on the homepage or navigate to the Customers section.",
        "payment": "You can record payments by clicking 'Record Payment' on the homepage or going to the Billing section.",
        "help": "I can help with creating invoices, managing customers, recording payments, and navigating the app. What do you need assistance with?",
        "settings": "You can find all settings by clicking on the Settings icon in the sidebar or navigation menu."
      };
      
      // Simple keyword matching
      let responseText = "I'm here to help with your invoicing needs. Could you provide more details about what you're looking for?";
      
      const lowercaseInput = input.toLowerCase();
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(keyword)) {
          responseText = response;
          break;
        }
      }
      
      const botMessage: Message = {
        role: 'bot',
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        className="fixed bottom-20 right-4 rounded-full p-3 shadow-lg md:bottom-6"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className={cn(
            "sm:max-w-[400px] p-0 gap-0",
            isMinimized ? "h-14 overflow-hidden" : "h-[500px] max-h-[80vh]"
          )}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between bg-primary p-3 text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">Zoho Invoice Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              {isMinimized ? (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={() => setIsMinimized(false)}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={() => setIsMinimized(true)}>
                  <Minimize2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Messages area */}
          {!isMinimized && (
            <>
              <div className="flex flex-col p-4 overflow-y-auto h-[calc(100%-110px)]">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "mb-3 max-w-[85%] rounded-lg p-3",
                      message.role === 'user' ? "bg-primary text-primary-foreground self-end" : "bg-muted self-start"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                {isTyping && (
                  <div className="self-start bg-muted rounded-lg p-3 mb-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input area */}
              <div className="border-t p-3 flex gap-2 items-end">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon" 
                  className="h-10 w-10 shrink-0"
                  disabled={!input.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
