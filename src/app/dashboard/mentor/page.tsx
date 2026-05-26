'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Plus, Send, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, timeAgo } from '@/lib/utils'
import type { Message, Thread } from '@/types'

// Mock data
const MOCK_THREADS: Thread[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'MERN Hackathon Prep',
    description: 'Getting ready for the upcoming hackathon',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    messageCount: 24,
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Internship Interview Prep',
    description: 'Preparing for internship interviews',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 18,
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Career Direction',
    description: 'Deciding between different paths',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 12,
  },
]

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    threadId: '1',
    role: 'user',
    content: 'I want to build a full-stack MERN app for the hackathon. What should I focus on?',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    threadId: '1',
    role: 'assistant',
    content: `Great direction! For a hackathon, I'd suggest focusing on these areas:

**Core Focus:**
- Start with a clear problem statement that solves a real need
- Build the MVP first - don't over-engineer
- Make sure the user experience is smooth

**Tech Stack Suggestion:**
- React for the frontend (you already know this)
- Node.js + Express for the backend
- MongoDB for database (good for rapid prototyping)

**What to prioritize:**
1. Working prototype by day 2
2. Real data and API integration by day 3
3. Polish UI/UX for the demo

Given that you mentioned tutorial fatigue before, focus on building something *novel* - not another todo app. What problem are you trying to solve?`,
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    threadId: '1',
    role: 'user',
    content: 'I want to build a platform that helps students find study groups. Is that too ambitious?',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    threadId: '1',
    role: 'assistant',
    content: `Not too ambitious at all - that's actually a solid idea! And given your background mentioning isolation in learning, you deeply understand the problem.

**Why this works:**
- Clear user need
- MVP scope is manageable (48-72 hours)
- You can demo it well

**Lean MVP approach:**
1. User signup + profile (interests, subject, year)
2. Browse/filter study groups
3. Create a group and invite others
4. Simple in-app messaging

You can skip: advanced analytics, recommendation algorithms, etc. Ship the core first.

**Reality check:** This solves a real problem you've experienced. That's often what wins at hackathons. How confident are you building the backend?`,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
]

export default function MentorPage() {
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS)
  const [selectedThreadId, setSelectedThreadId] = useState<string>('1')
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedThread = threads.find((t) => t.id === selectedThreadId)
  const threadMessages = messages.filter((m) => m.threadId === selectedThreadId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [threadMessages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      threadId: selectedThreadId,
      role: 'user',
      content: input,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate mentor response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        threadId: selectedThreadId,
        role: 'assistant',
        content: `That's a thoughtful question. Let me think about this...

Based on what you've shared about your journey, here's my take:

Remember when you mentioned struggling with tutorial fatigue? This is exactly why shipping a real project matters. It forces you to think beyond syntax and into systems thinking.

Keep pushing forward. You're building the right foundations. 🌟`,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleNewThread = () => {
    const newThread: Thread = {
      id: Date.now().toString(),
      userId: 'user1',
      title: 'New Conversation',
      description: 'Start a new conversation with your mentor',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 0,
    }

    setThreads((prev) => [newThread, ...prev])
    setSelectedThreadId(newThread.id)
    setMessages([])
  }

  return (
    <div className="flex h-full">
      {/* Threads sidebar */}
      <div className="w-80 border-r border-border/40 bg-card">
        <div className="flex items-center justify-between border-b border-border/40 p-4">
          <h2 className="font-semibold">Conversations</h2>
          <Button variant="ghost" size="icon" onClick={handleNewThread}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto p-2">
          <AnimatePresence>
            {threads.map((thread) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <button
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={cn(
                    'w-full rounded-lg p-3 text-left transition-colors',
                    selectedThreadId === thread.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="mt-1 h-3.5 w-3.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">{thread.title}</p>
                      <p
                        className={cn(
                          'truncate text-xs',
                          selectedThreadId === thread.id
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        )}
                      >
                        {timeAgo(thread.updatedAt)}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {selectedThread && (
          <>
            {/* Header */}
            <div className="border-b border-border/40 px-6 py-4">
              <h1 className="text-lg font-semibold">{selectedThread.title}</h1>
              <p className="text-sm text-muted-foreground">{selectedThread.description}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-4">
                <AnimatePresence>
                  {threadMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-md rounded-lg px-4 py-3',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        <p
                          className={cn(
                            'mt-1 text-xs',
                            message.role === 'user'
                              ? 'text-primary-foreground/60'
                              : 'text-muted-foreground'
                          )}
                        >
                          {new Date(message.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-lg bg-muted px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border/40 px-6 py-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask your mentor anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
