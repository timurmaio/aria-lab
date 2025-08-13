import React from 'react'
import { MyButton } from '../../src'
import { UIPicker } from './UIPicker'
import "./style.css"

export function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Component Playground</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">MyButton Component</h2>
          <MyButton type="primary" />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">UIPicker Component</h2>
          <UIPicker />
        </div>
      </div>
    </div>
  )
}
