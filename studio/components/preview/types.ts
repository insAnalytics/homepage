// Props Sanity's Structure Builder passes to a component registered via
// S.view.component() — `document.displayed` is the live value (initial,
// then historical, then draft, then published, in that precedence), so
// reading from it reflects in-progress edits without needing a save.
export interface PreviewViewProps {
  document: {
    displayed: Record<string, unknown> | null
  }
}
