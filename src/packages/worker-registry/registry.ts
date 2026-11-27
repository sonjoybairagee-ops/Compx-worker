/**
 * workers/registry/registry.ts
 *
 * Phase 3 from the roadmap. Central plugin registration hub.
 * Fully adapted for Supabase + Playwright architecture.
 *
 * SCOPE (2026-11-27): Google Maps + Website only. All other source
 * plugins (instagram, linkedin, youtube, amazon, facebook, ebay,
 * tripadvisor) are disabled — restore them from git history if needed.
 */

import type { SourcePlugin } from "@compx/scraper-core";
export type { SourcePlugin, PluginContext, PluginResult } from "@compx/scraper-core";

// Import enabled plugins only (google_maps + website)
import { websitePlugin } from "@compx/plugin-website";
import { googleMapsPlugin } from "@compx/plugin-google-maps";

const registry = new Map<string, SourcePlugin>();

export function registerPlugin(plugin: SourcePlugin): void {
  if (registry.has(plugin.name)) {
    console.warn(`[Registry] Overwriting existing plugin registration for "${plugin.name}"`);
  }
  registry.set(plugin.name, plugin);
}

export function getPlugin(source: string): SourcePlugin | undefined {
  return registry.get(source);
}

export function listPlugins(): string[] {
  return Array.from(registry.keys());
}

// ── Register enabled plugins ────────────────────────────────────────────────

// Website Scraper (No Browser)
registerPlugin(websitePlugin);

// ✅ ALIAS FIX: Legacy jobs send "websites", plugin expects "website"
registerPlugin({ ...websitePlugin, name: "websites" });

// Google Maps (SerpApi, no browser)
registerPlugin(googleMapsPlugin);

console.log(`[Registry] Registered ${registry.size} plugins: ${listPlugins().join(", ")}`);