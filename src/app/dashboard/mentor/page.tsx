'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Send, MessageSquare, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, timeAgo } from '@/lib/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ReactMarkdown from 'react-markdown'

interface Thread {
  id: string
  title: string
  description: string | null
  updated_at: string
  message_count: number
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
  thread_id: string
}

export default function MentorPage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [isComposingNewThread, setIsComposingNewThread] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [messagesError, setMessagesError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const latestMessagesRequestRef = useRef<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadThreads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadThreads = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H2',
        location: 'src/app/dashboard/mentor/page.tsx:loadThreads',
        message: 'loadThreads called',
        data: {},
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    const { data: { session } } = await supabase.auth.getSession()
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H2',
        location: 'src/app/dashboard/mentor/page.tsx:loadThreads',
        message: 'getSession result (threads)',
        data: { hasSession: Boolean(session) },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    if (!session) return
    const { data } = await supabase
      .from('threads')
      .select('*')
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false })
    if (data) {
      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
        body: JSON.stringify({
          sessionId: 'ce31a0',
          runId: 'pre-fix',
          hypothesisId: 'H2',
          location: 'src/app/dashboard/mentor/page.tsx:loadThreads',
          message: 'threads loaded',
          data: { threadCount: Array.isArray(data) ? data.length : null },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion
      setThreads(data)
      if (data.length > 0 && !selectedThreadId) {
        const firstThreadId = data[0].id
        setSelectedThreadId(firstThreadId)
        setIsComposingNewThread(false)
      }
    }
  }

  useEffect(() => {
    if (!selectedThreadId) return
    setMessages([])
    setMessagesError(null)
    void loadMessages(selectedThreadId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThreadId])

  const loadMessages = async (threadId: string) => {
    const requestToken = `${threadId}:${Date.now()}`
    latestMessagesRequestRef.current = requestToken
    setIsLoading(true)
    setMessagesError(null)

    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'post-fix',
        hypothesisId: 'H7',
        location: 'src/app/dashboard/mentor/page.tsx:loadMessages',
        message: 'loadMessages started',
        data: { threadId, requestToken },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true })

    const isLatestRequest = latestMessagesRequestRef.current === requestToken

    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'post-fix',
        hypothesisId: 'H7',
        location: 'src/app/dashboard/mentor/page.tsx:loadMessages',
        message: 'loadMessages completed',
        data: {
          threadId,
          requestToken,
          isLatestRequest,
          hasError: Boolean(error),
          messageCount: Array.isArray(data) ? data.length : null,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    if (!isLatestRequest) return

    if (error) {
      setMessages([])
      setMessagesError('Unable to load this conversation right now.')
      setIsLoading(false)
      return
    }

    setMessages(data || [])
    setIsLoading(false)
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isSending) return

    const userMessage = input.trim()
    setInput('')
    setIsSending(true)

    setMessages((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        thread_id: selectedThreadId || '',
        role: 'user',
        content: userMessage,
        created_at: new Date().toISOString(),
      },
    ])

    try {
      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
        body: JSON.stringify({
          sessionId: 'ce31a0',
          runId: 'pre-fix',
          hypothesisId: 'H3',
          location: 'src/app/dashboard/mentor/page.tsx:handleSendMessage',
          message: 'sending message to /api/chat',
          data: { hasSelectedThreadId: Boolean(selectedThreadId), userMessageLength: userMessage.length },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, threadId: selectedThreadId }),
      })

      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
        body: JSON.stringify({
          sessionId: 'ce31a0',
          runId: 'pre-fix',
          hypothesisId: 'H3',
          location: 'src/app/dashboard/mentor/page.tsx:handleSendMessage',
          message: 'received response from /api/chat',
          data: { ok: res.ok, status: res.status },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion

      const data = await res.json()
      if (!res.ok) {
        throw new Error(
          data?.errorCode === 'GEMINI_QUOTA_EXCEEDED'
            ? 'AI quota exceeded on your Gemini key. Check quota/billing and retry.'
            : data?.errorCode === 'GEMINI_MODEL_UNAVAILABLE'
              ? 'Configured Gemini model is unavailable. Update model settings and retry.'
              : data?.error ||
                (res.status === 429
                  ? 'AI quota exceeded. Please check your Gemini plan/billing or try again later.'
                  : 'Failed to generate response')
        )
      }

      if (data?.warning && typeof data.warning === 'string') {
        setMessagesError(data.warning)
      } else {
        setMessagesError(null)
      }

      if (!selectedThreadId && data.threadId) {
        const createdThreadId = data.threadId
        setSelectedThreadId(createdThreadId)
        setIsComposingNewThread(false)
        await loadThreads()
      } else if (selectedThreadId) {
        await loadMessages(selectedThreadId)
      }
    } catch (error) {
      const fallbackMessage = "I couldn't process that right now. Please try again."
      const message =
        error instanceof Error && error.message
          ? error.message
          : fallbackMessage
      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
        body: JSON.stringify({
          sessionId: 'ce31a0',
          runId: 'pre-fix',
          hypothesisId: 'H3',
          location: 'src/app/dashboard/mentor/page.tsx:handleSendMessage',
          message: 'sendMessage failed (caught)',
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          thread_id: selectedThreadId || '',
          role: 'assistant',
          content: message,
          created_at: new Date().toISOString(),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleNewThread = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'post-fix',
        hypothesisId: 'H5',
        location: 'src/app/dashboard/mentor/page.tsx:handleNewThread',
        message: 'new thread button clicked',
        data: { threadCount: threads.length, hadSelectedThreadId: Boolean(selectedThreadId) },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    setIsComposingNewThread(true)
    setSelectedThreadId(null)
    setMessages([])
    setInput('')
  }

  return (
    <div className="flex h-full gap-4">
      <div className="flex w-72 flex-col rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-sm font-semibold">Conversations</h2>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleNewThread}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {threads.length === 0 && (
            <p className="px-3 py-8 text-center text-xs text-muted-foreground">
              Start a conversation with your mentor
            </p>
          )}
          <AnimatePresence>
            {threads.map((thread) => (
              <motion.button
                key={thread.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSelectedThreadId(thread.id)
                  setIsComposingNewThread(false)
                }}
                className={cn(
                  'w-full rounded-lg px-3 py-2.5 text-left transition-colors',
                  selectedThreadId === thread.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                <div className="flex items-start gap-2.5">
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{thread.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{timeAgo(thread.updated_at)}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border bg-card">
        {selectedThreadId || isComposingNewThread || threads.length === 0 ? (
          <>
            <div className="border-b px-6 py-4">
              <h1 className="text-base font-semibold">
                {threads.find((t) => t.id === selectedThreadId)?.title || 'New Conversation'}
              </h1>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto max-w-3xl space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[75%] rounded-2xl px-4 py-3',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        {/* 1. Import it at the very top of your file: import ReactMarkdown from 'react-markdown' */}
                        <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed break-words text-current">
                           <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                        <p
                          className={cn(
                            'mt-1.5 text-[10px]',
                            message.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                          )}
                        >
                          {new Date(message.created_at).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isSending && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="h-2 w-2 rounded-full bg-muted-foreground/50"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {messages.length === 0 && !isSending && (
                  <div className="py-16 text-center">
                    <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      {isLoading
                        ? 'Loading conversation...'
                        : messagesError || 'Ask your mentor anything'}
                    </p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <div className="mx-auto max-w-3xl flex gap-2">
                <Input
                  placeholder="Ask your mentor anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isSending}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isSending}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <Sparkles className="mx-auto h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Select a conversation or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
