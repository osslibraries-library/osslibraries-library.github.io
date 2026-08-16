---
layout: home

hero:
  name: OSSLibraries
  text: for HarmonyOS apps
  tagline: Scans OHPM dependencies at build time and renders the resulting license list in the app.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/composable-tu/osslibraries

features:
  - title: End-to-end
    details: One pipeline from dependency scan to in-app display. The list reflects the dependencies that are actually packaged into the HAP.
  - title: Zero config
    details: Register the Hvigor plugin once. Every build regenerates the metadata from your current oh_modules.
  - title: Prebuilt UI
    details: An adaptive page with a list and a detail view built on ArkUI and UI Design Kit. Import the page and navigate by named route.
  - title: Accurate licenses
    details: SPDX expressions like Apache-2.0 OR MIT are parsed fully, and common misspellings are corrected.
  - title: Full license text
    details: Prefers the LICENSE file bundled in each package, and falls back to canonical SPDX text.
  - title: Custom UI
    details: Use the core package alone to load and parse the data, and render it however you like.
---

> [!TIP]
> This library ships skills you can install so an AI agent can wire them into your project for you.
>
> ::: code-group
>
> ```zsh [npm]
> npx skills add composable-tu/osslibraries
> ```
>
> ```zsh [pnpm]
> pnpm dlx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Yarn]
> yarn dlx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Bun]
> bunx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Deno]
> deno x npm:skills add composable-tu/osslibraries
> ```
>
> ```zsh [Vite+]
> vpx skills add composable-tu/osslibraries
> ```
>
> ```zsh [vlt]
> vlx skills add composable-tu/osslibraries
> ```
>
> :::

::: info What is SPDX?
[SPDX](https://spdx.dev/learn/overview/) (Software Package Data Exchange) is an open standard for communicating software bill of material information, including provenance, license, security, and other related information. SPDX reduces redundant work by providing common formats for organizations and communities to share important data, thereby streamlining and improving compliance, security, and dependability. The SPDX specification is recognized as the international open standard for security, license compliance, and other software supply chain artifacts as ISO/IEC 5962:2021.

OSSLibraries uses [SPDX License List](https://spdx.org/licenses/) to identify and display the license of every dependency.
:::
