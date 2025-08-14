import React, { useState } from 'react'

const ChatDialog = ({ onEditStop }) => {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  const send = async () => {
    if (!message.trim()) return
    const entry = { role: 'user', content: message }
    setHistory((h) => [...h, entry])
    // For MVP, just echo. In production, call OpenAI to modify a stop.
    setHistory((h) => [...h, { role: 'assistant', content: 'Noted. Click a stop and I will adjust it.' }])
    setMessage('')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
      <div className="font-semibold mb-2">Chat</div>
      <div className="flex-1 overflow-auto space-y-2 mb-2">
        {history.map((m, idx) => (
          <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask to add a cafe to stop 2, make it more food focused, etc."
          onKeyDown={(e) => { if (e.key === 'Enter') send() }}
        />
        <button onClick={send} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  )
}

export default ChatDialog