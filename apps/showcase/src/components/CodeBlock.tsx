import { useState } from 'react'

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="demo-theme-code-block">
      <div className="demo-theme-code-header">
        <span>Code</span>
        <button type="button" className="demo-code-copy" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="demo-code-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
