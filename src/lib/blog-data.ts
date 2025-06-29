export interface BlogPost {
  id: number
  title: string
  date: string
  author: string
  description: string
  image: string
  slug: string
  readTime: string
  tags: string[]
  content?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Your First AI Chatbot",
    date: "April 3, 2024",
    author: "AI Team",
    description: "A comprehensive guide to building an intelligent chatbot using Next.js and OpenAI API. Learn how to create conversational AI that can understand context and provide meaningful responses.",
    image: "/images/blog/photo-1677442136019-21780ecad995.jpg",
    slug: "building-ai-chatbot",
    readTime: "8 min read",
    tags: ["AI", "Chatbot", "Next.js", "OpenAI"],
    content: `
# Building Your First AI Chatbot

Creating an AI chatbot has never been easier with modern tools and frameworks. In this comprehensive guide, we'll walk through building an intelligent chatbot using Next.js and the OpenAI API.

## Getting Started

Before we dive into coding, let's understand what we're building. Our chatbot will be able to:

- Understand user messages in natural language
- Provide contextual responses
- Maintain conversation history
- Handle multiple conversation threads

## Setting Up Your Environment

First, let's set up our development environment:

\`\`\`bash
npx create-next-app@latest chatbot-app
cd chatbot-app
npm install openai
\`\`\`

## Creating the Chat Interface

We'll start by creating a simple chat interface that users can interact with:

\`\`\`tsx
'use client'

import { useState } from 'react'

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    // Implementation here
  }

  return (
    <div className="chat-container">
      {/* Chat messages */}
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.content}
          </div>
        ))}
      </div>
      
      {/* Input field */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
\`\`\`

## Integrating OpenAI API

Now let's integrate the OpenAI API to power our chatbot:

\`\`\`tsx
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateResponse(messages) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  })

  return completion.choices[0].message.content
}
\`\`\`

## Adding Context and Memory

To make our chatbot more intelligent, we need to maintain conversation context:

\`\`\`tsx
const [conversationHistory, setConversationHistory] = useState([
  {
    role: "system",
    content: "You are a helpful AI assistant."
  }
])

const sendMessage = async () => {
  const newMessage = { role: "user", content: input }
  const updatedHistory = [...conversationHistory, newMessage]
  
  const response = await generateResponse(updatedHistory)
  
  setConversationHistory([
    ...updatedHistory,
    { role: "assistant", content: response }
  ])
}
\`\`\`

## Styling and UI Enhancements

Let's make our chatbot look professional with some CSS:

\`\`\`css
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}

.message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

.user-message {
  background-color: #007bff;
  color: white;
  margin-left: 20%;
}

.assistant-message {
  background-color: #f8f9fa;
  margin-right: 20%;
}
\`\`\`

## Error Handling and Rate Limiting

It's important to handle errors gracefully and implement rate limiting:

\`\`\`tsx
try {
  const response = await generateResponse(updatedHistory)
  // Handle successful response
} catch (error) {
  console.error('Error generating response:', error)
  // Show error message to user
}
\`\`\`

## Deployment Considerations

When deploying your chatbot, consider:

- **Environment Variables**: Store your OpenAI API key securely
- **Rate Limiting**: Implement proper rate limiting to avoid API quota issues
- **Error Handling**: Gracefully handle API failures
- **User Authentication**: Consider adding user authentication for personalized experiences

## Next Steps

Congratulations! You've built your first AI chatbot. Here are some ideas for enhancements:

- Add voice input/output capabilities
- Implement conversation saving and loading
- Add support for file uploads and analysis
- Create specialized chatbots for different use cases

## Conclusion

Building an AI chatbot with Next.js and OpenAI is straightforward and powerful. The combination of modern web frameworks and advanced AI APIs opens up endless possibilities for creating intelligent, interactive applications.

Start experimenting with different prompts, conversation flows, and UI designs to create a chatbot that perfectly fits your needs.
    `
  },
  {
    id: 2,
    title: "Getting Started with AI Development",
    date: "April 2, 2024",
    author: "Dev Team",
    description: "Learn the basics of AI development and start building your first AI application. This guide covers everything from setting up your environment to deploying your first model.",
    image: "/images/blog/photo-1620712943543-bcc4688e7485.jpg",
    slug: "getting-started-with-ai-development",
    readTime: "12 min read",
    tags: ["AI", "Development", "Beginner", "Tutorial"],
    content: `
# Getting Started with AI Development

AI development is becoming increasingly accessible to developers of all skill levels. This comprehensive guide will help you understand the fundamentals and start building your first AI application.

## Understanding AI Development

AI development involves creating systems that can perform tasks that typically require human intelligence. This includes:

- Machine Learning
- Natural Language Processing
- Computer Vision
- Predictive Analytics

## Setting Up Your Development Environment

Let's start by setting up the necessary tools and frameworks.

## Popular AI Frameworks

Choose the right framework for your project:

- **TensorFlow**: Google's open-source platform
- **PyTorch**: Facebook's deep learning framework
- **OpenAI API**: Ready-to-use AI models
- **Hugging Face**: Pre-trained models and datasets

## Your First AI Project

We'll build a simple sentiment analysis tool to get you started.

## Best Practices

Follow these guidelines for successful AI development:

1. Start with clear objectives
2. Use quality data
3. Iterate and improve
4. Monitor performance
5. Consider ethical implications

## Conclusion

AI development is an exciting field with endless possibilities. Start with simple projects and gradually work your way up to more complex applications.
    `
  },
  {
    id: 3,
    title: "Welcome to AImaker",
    date: "April 1, 2024",
    author: "AImaker Team",
    description: "Start your AI journey and explore unlimited possibilities in AI development. Discover the tools and resources that will help you build amazing AI applications.",
    image: "/images/blog/photo-1677442136019-21780ecad995.jpg",
    slug: "welcome-to-aimaker",
    readTime: "5 min read",
    tags: ["Welcome", "AI", "Platform", "Getting Started"],
    content: `
# Welcome to AImaker

Welcome to AImaker, your gateway to the world of artificial intelligence development. We're excited to have you join our community of innovators, developers, and AI enthusiasts.

## What is AImaker?

AImaker is a comprehensive platform designed to make AI development accessible to everyone. Whether you're a seasoned developer or just starting your AI journey, we provide the tools, resources, and community support you need to succeed.

## Our Mission

We believe that AI should be accessible to everyone. Our mission is to democratize AI development by providing:

- Easy-to-use tools and frameworks
- Comprehensive tutorials and guides
- A supportive community
- Cutting-edge AI resources

## Getting Started

Ready to begin your AI journey? Here's how to get started:

1. **Explore our tutorials**: Start with our beginner-friendly guides
2. **Join the community**: Connect with other developers and AI enthusiasts
3. **Build your first project**: Put your knowledge into practice
4. **Share and learn**: Contribute to the community and learn from others

## What You'll Find Here

Our platform offers:

- **Tutorials**: Step-by-step guides for AI development
- **Tools**: Powerful AI development tools and frameworks
- **Community**: A vibrant community of AI developers
- **Resources**: Curated resources for AI learning

## The Future of AI

AI is transforming every industry and aspect of our lives. By joining AImaker, you're becoming part of this exciting revolution. Together, we can build a future where AI enhances human capabilities and solves real-world problems.

## Let's Build the Future Together

We're thrilled to have you on this journey. Whether you're looking to build chatbots, computer vision applications, or any other AI project, AImaker is here to support you every step of the way.

Welcome to the future of AI development. Let's create something amazing together!
    `
  }
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getRelatedPosts(currentPostId: number, limit: number = 2): BlogPost[] {
  return blogPosts.filter(post => post.id !== currentPostId).slice(0, limit)
}