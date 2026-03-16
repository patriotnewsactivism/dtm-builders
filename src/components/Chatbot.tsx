import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const BOT_NAMES = [
  "Sarah", "Michael", "Jessica", "David", "Emma", 
  "James", "Olivia", "William", "Sophia", "Benjamin",
  "Grace", "Daniel", "Chloe", "Matthew", "Lily"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botName] = useState(() => BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  // Initialize Gemini Chat
  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const systemInstruction = `You are ${botName}, an empathetic, warm, and highly intelligent assistant for DTM Builders.
        DTM Builders is owned by Daniel Skrzypczak (Phone: 409-683-7127). They have been serving the Galveston area since Hurricane Ike, specializing in coastal and beach homes, new construction, and kitchen & bath remodels.
        
        Your goals:
        1. Answer questions about DTM Builders.
        2. Qualify leads by gently asking about their project scope, location in the Galveston area, and timeline.
        3. Book appointments by encouraging them to call Daniel at 409-683-7127 or collecting their contact info so Daniel can reach out.
        4. Show empathy. Renovating or building a home (especially in a hurricane-prone area) can be stressful. Validate their feelings, listen actively, and reassure them of DTM Builders' expertise and reliability.
        5. Keep every conversation unique and natural. Vary your phrasing, be conversational, and do not use canned or robotic responses.
        
        Introduce yourself as ${botName} in your first message, and ask how you can help them today.`;

        chatRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction,
            temperature: 0.9, // Higher temperature for more unique, varied conversations
          }
        });

        // Trigger initial greeting
        setIsLoading(true);
        const response = await chatRef.current.sendMessage({ message: "Hello" });
        setMessages([{ role: 'model', text: response.text }]);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };

    if (isOpen && !chatRef.current) {
      initChat();
    }
  }, [isOpen, botName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Add a placeholder for the streaming response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      const stream = await chatRef.current.sendMessageStream({ message: userMsg });
      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = fullText;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].text = "I'm so sorry, I seem to be having a little trouble connecting right now. Please feel free to call Daniel directly at (409) 683-7127.";
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-amber-500 text-slate-900 rounded-full shadow-2xl hover:bg-amber-400 hover:scale-110 transition-all z-50 flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 w-full h-[100dvh] sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[80vh] bg-white sm:rounded-2xl shadow-2xl border-0 sm:border border-slate-200 flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-slate-900">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">{botName}</h3>
                  <p className="text-xs text-slate-300">DTM Builders Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.length === 0 && isLoading && (
                <div className="flex justify-center items-center h-full text-slate-400">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 mt-1">
                      <Bot size={16} />
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-amber-500 text-slate-900 rounded-tr-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-500 mt-1">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <form 
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full p-1 pr-2 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500 transition-all"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-slate-700"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 transition-colors"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
