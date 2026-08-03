import { createServer } from 'vite'
import { JSDOM } from 'jsdom'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
})

globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.HTMLElement = dom.window.HTMLElement
globalThis.Element = dom.window.Element
globalThis.Node = dom.window.Node
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
})
globalThis.IS_REACT_ACT_ENVIRONMENT = true
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false
    },
  }))

window.IntersectionObserver =
  window.IntersectionObserver ||
  class {
    constructor(cb) {
      this.cb = cb
    }
    observe(target) {
      this.cb([{ isIntersecting: true, target }], this)
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
globalThis.IntersectionObserver = window.IntersectionObserver

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const { default: Projects } = await server.ssrLoadModule('/src/components/Projects/Projects.jsx')

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const mount = async () => {
  const container = document.getElementById('root')
  const root = createRoot(container)
  await act(async () => root.render(React.createElement(Projects)))
  return { root, container }
}

const results = []

try {
  const { root, container } = await mount()

  const initialText = container.textContent
  results.push(['loading spinner shown on mount', initialText.includes('Loading repositories')])
  results.push(['spinner has role=status', container.querySelector('[role="status"]') !== null])

  await act(async () => await wait(4000))
  const successText = container.textContent
  const links = [...container.querySelectorAll('a')].filter((a) => a.href.includes('github.com/Talaviya-Sarthak/'))
  results.push(['loading gone after fetch', !successText.includes('Loading repositories')])
  results.push(['repos rendered', successText.includes('repositories')])
  results.push(['repo links point to profile repos', links.length > 0])
  results.push(['search input present', container.querySelector('input[type="search"]') !== null])
  results.push(['star icon rendered', container.querySelector('svg') !== null])

  root.unmount()

  globalThis.fetch = () =>
    Promise.reject(new Error('Simulated network failure (504)'))

  const { root: root2, container: container2 } = await mount()
  await act(async () => await wait(800))
  const errorText = container2.textContent
  results.push(['error message shown', errorText.includes("Couldn't load repositories")])
  results.push(['error detail shown', errorText.includes('Simulated network failure')])
  results.push(['retry button present', errorText.includes('Try Again')])
  root2.unmount()
} catch (err) {
  const details = Array.isArray(err.errors)
    ? err.errors.map((e) => e?.message ?? e?.stack ?? String(e)).join('\n---\n')
    : err?.stack ?? String(err)
  results.push(['EXCEPTION', false, details])
}

let fail = 0
for (const [label, pass, extra] of results) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${extra ? ` :: ${extra}` : ''}`)
  if (!pass) fail++
}
console.log(fail === 0 ? '\nAll API integration tests passed' : `\n${fail} checks failed`)
await server.close()
process.exit(fail === 0 ? 0 : 1)
