---
layout: home

hero:
  name: OSSLibraries
  text: for HarmonyOS apps
  tagline: Scans OHPM dependencies at build time and renders the resulting license list in app.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/composable-tu/osslibraries

features:
  - title: End-to-end
    details: One pipeline from dependency scan to in-app display. The list reflects the dependencies that are actually packaged into the HAP.
  - title: Zero config
    details: Register the Hvigor plugin once. Every build regenerates the metadata from your current oh_modules.
  - title: Prebuilt UI
    details: List and detail pages built on ArkUI and UI Design Kit. Import the pages and navigate by named route.
  - title: Accurate licenses
    details: SPDX expressions like Apache-2.0 OR MIT are parsed fully, and common misspellings are corrected.
  - title: Full license text
    details: Prefers the LICENSE file bundled in each package, and falls back to canonical SPDX text.
  - title: Custom UI
    details: Use the core package alone to load and parse the data, and render it however you like.
---
