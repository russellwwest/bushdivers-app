import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import '../css/app.css'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import ThemeContextWrapper from './Context/ThemeContextWrapper'

InertiaProgress.init()

createInertiaApp({
  resolve: name => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<ThemeContextWrapper><App {...props} /></ThemeContextWrapper> )
  },
})
