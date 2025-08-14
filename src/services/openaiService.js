class OpenAIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY
    this.apiBase = import.meta.env.VITE_OPENAI_API_BASE || 'https://api.openai.com/v1'
    this.lastRequestTime = 0
  }

  async makeRequest(messages, options = {}, model = 'gpt-4o') {
    await this.rateLimit()
    const body = {
      model,
      messages,
      temperature: options.temperature ?? 0.6,
      max_tokens: options.max_tokens ?? 800
    }
    const res = await fetch(`${this.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const txt = await res.text()
      throw new Error(`API error ${res.status}: ${txt}`)
    }
    const data = await res.json()
    return data.choices[0].message.content
  }

  async generateTripMetadata(regionData, parameters) {
    const prompt = `Create a ${parameters.duration}-day trip to ${regionData.name}.

Themes: ${parameters.themes?.join(', ') || 'general'}
Budget: ${parameters.budget || 'standard'}

Return ONLY JSON:
{
  "region": "${regionData.name}",
  "duration": ${parameters.duration},
  "budget_level": "${parameters.budget || 'standard'}",
  "estimated_budget": "string",
  "stops": [
    {
      "id": 1,
      "name": "string",
      "lat": number,
      "lng": number,
      "duration": "string",
      "tags": ["string"],
      "image_url": "https://source.unsplash.com/800x600/?keyword"
    }
  ]
}`
    const messages = [
      { role: 'system', content: 'You are a travel planner. Return ONLY valid JSON, no markdown.' },
      { role: 'user', content: prompt }
    ]
    const resp = await this.makeRequest(messages, { temperature: 0.6 }, parameters.aiModel)
    return this.parseJSON(resp)
  }

  async generateStopDetails(tripParameters, stopMetadata) {
    const prompt = `Generate detailed information for ${stopMetadata.name}.
Trip: ${tripParameters.duration} days, ${tripParameters.themes?.join(', ') || 'general'} themes, ${tripParameters.budget} budget

Return ONLY JSON:
{
  "id": ${stopMetadata.id},
  "name": "${stopMetadata.name}",
  "lat": ${stopMetadata.lat},
  "lng": ${stopMetadata.lng},
  "duration": "${stopMetadata.duration || '1-2 days'}",
  "description": "detailed description",
  "highlights": ["string", "string"],
  "activities": [
    {
      "name": "string",
      "description": "string",
      "duration": "string",
      "cost_estimate": "string"
    }
  ],
  "accommodation_suggestions": [
    {
      "type": "hotel/hostel",
      "name": "string",
      "price_range": "string"
    }
  ],
  "local_tips": ["string", "string"],
  "image_url": "${stopMetadata.image_url || 'https://source.unsplash.com/800x600/?travel'}"
}`
    const messages = [
      { role: 'system', content: 'You are a travel planner. Return ONLY valid JSON, no markdown.' },
      { role: 'user', content: prompt }
    ]
    const resp = await this.makeRequest(messages, { temperature: 0.7 })
    return this.parseJSON(resp)
  }

  parseJSON(text) {
    try {
      return JSON.parse(text)
    } catch {
      const md = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (md) {
        try { return JSON.parse(md[1]) } catch {}
      }
      const obj = text.match(/\{[\s\S]*\}/)
      if (obj) {
        try { return JSON.parse(obj[0]) } catch {}
      }
      throw new Error('Failed to parse JSON from model response.')
    }
  }

  async rateLimit() {
    const now = Date.now()
    const elapsed = now - this.lastRequestTime
    const minInterval = 1000
    if (elapsed < minInterval) {
      await new Promise(r => setTimeout(r, minInterval - elapsed))
    }
    this.lastRequestTime = Date.now()
  }
}

export default new OpenAIService()