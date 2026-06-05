export type Quarter = "Q3 2026" | "Q4 2026" | "Q1 2027";
export type Tag = "DISCOVERY" | "SPIKE" | "BUILD" | "TEST" | "SCALE";
export type Priority = "P1" | "P2" | "P3";

export interface RoadmapCard {
  id: string;
  title: string;
  description: string;
  quarter: Quarter;
  swimlane: string;
  tag: Tag;
  priority: Priority;
  dependencies?: string[];
}

export const QUARTERS: Quarter[] = ["Q3 2026", "Q4 2026", "Q1 2027"];

export const QUARTER_THEMES: Record<Quarter, string> = {
  "Q3 2026": "Learn + Define",
  "Q4 2026": "Test + Productize",
  "Q1 2027": "Scale + Standardize",
};

export const SWIMLANES = [
  "Catch-Up Systems / Daily Story",
  "Workflow Intelligence + AI/ML",
  "Timeline / Storyline Navigation",
  "Surface + Daypart Expansion",
  "Features Programming + Richer Storytelling",
  "Operating Model + Partner Readiness",
] as const;

export type Swimlane = (typeof SWIMLANES)[number];

export const SWIMLANE_SHORT: Record<Swimlane, string> = {
  "Catch-Up Systems / Daily Story": "Catch-Up / Daily Story",
  "Workflow Intelligence + AI/ML": "Workflow Intelligence",
  "Timeline / Storyline Navigation": "Timeline / Storyline",
  "Surface + Daypart Expansion": "Surface + Daypart",
  "Features Programming + Richer Storytelling": "Features Programming",
  "Operating Model + Partner Readiness": "Operating Model",
};

export const KEY_DECISIONS = [
  "Confirm Catch-Up / Daily Story as the Q3 flagship.",
  'Confirm Timeline / Storyline Navigation as the primary "Help Me Understand" lane.',
  "Confirm FLEX as the test path for Features Home / lower-feed programming hypotheses.",
  "Confirm attached delivery / away-team support model.",
  "Identify Principal Engineer / Technical Strategy partner.",
  "Align on AI/ML partner model for workflow intelligence.",
  "Confirm partner readiness cadence across App, Web, Events & Visuals, Analytics, UXR, Audience, Programming.",
  "Confirm Q4 decision gates: scale, iterate, pause, or productize.",
];

export const CARDS: RoadmapCard[] = [
  // ── Catch-Up Systems / Daily Story ──────────────────────────────
  { id: "c01", title: "Complete Phase 1 MVP readout", description: "Document and present findings from Phase 1 MVP launch, covering usage metrics, content performance, and editorial learnings.", quarter: "Q3 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "TEST", priority: "P1" },
  { id: "c02", title: "Run moderated post-launch user testing", description: "Conduct moderated research sessions with real users to evaluate Daily Catch-Up comprehension, satisfaction, and navigation.", quarter: "Q3 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "DISCOVERY", priority: "P1" },
  { id: "c03", title: "Define Catch-Up 2.0 / Daily Story brief", description: "Draft product brief for the next iteration of Daily Story, incorporating MVP learnings and updated editorial strategy.", quarter: "Q3 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "DISCOVERY", priority: "P1" },
  { id: "c04", title: "UX polish + launch readiness improvements", description: "Address identified UX friction points and ship improvements to increase launch readiness for Q4 iteration.", quarter: "Q3 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "BUILD", priority: "P1" },
  { id: "c05", title: "Define Q4 scale / iterate / pause recommendation", description: "Based on MVP readout, produce a clear recommendation on whether to scale, iterate, or pause Catch-Up for Q4.", quarter: "Q3 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "DISCOVERY", priority: "P1" },
  { id: "c06", title: "Catch-Up 2.0 MVP iteration", description: "Build and ship the next version of Catch-Up based on Q3 MVP learnings and the updated Daily Story brief.", quarter: "Q4 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "BUILD", priority: "P1" },
  { id: "c07", title: "AM Daily Story test", description: "A/B or FLEX test of the AM Daily Story placement, format, and content to validate engagement hypotheses.", quarter: "Q4 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "TEST", priority: "P1" },
  { id: "c08", title: "Topic-based Catch-Up package", description: "Prototype and test a topic-based Catch-Up experience allowing users to follow specific subject areas.", quarter: "Q4 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "TEST", priority: "P2", dependencies: ["Workflow Intelligence v1"] },
  { id: "c09", title: "Storyline subtopic package", description: "Test a subtopic-oriented storyline package to surface deeper context within a breaking or evolving story.", quarter: "Q4 2026", swimlane: "Catch-Up Systems / Daily Story", tag: "TEST", priority: "P2" },
  { id: "c10", title: "Daily Story system pattern", description: "Define and publish a reusable Daily Story system pattern for consistent implementation across surfaces and formats.", quarter: "Q1 2027", swimlane: "Catch-Up Systems / Daily Story", tag: "SCALE", priority: "P1" },
  { id: "c11", title: "Reusable Catch-Up package model", description: "Standardize the Catch-Up package model to enable reuse across editorial teams and product surfaces.", quarter: "Q1 2027", swimlane: "Catch-Up Systems / Daily Story", tag: "SCALE", priority: "P2" },
  { id: "c12", title: "Multi-surface Catch-Up standards", description: "Establish standards for Catch-Up rendering and behavior across app, web, and future surfaces.", quarter: "Q1 2027", swimlane: "Catch-Up Systems / Daily Story", tag: "SCALE", priority: "P2" },

  // ── Workflow Intelligence + AI/ML ────────────────────────────────
  { id: "w01", title: "Define AI/ML opportunity brief", description: "Research and frame the AI/ML opportunity space for workflow intelligence, including competitive landscape and internal capabilities.", quarter: "Q3 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "DISCOVERY", priority: "P1" },
  { id: "w02", title: "Auto-hydration requirements", description: "Spike the technical requirements for auto-hydrating Catch-Up packages with structured content metadata.", quarter: "Q3 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "SPIKE", priority: "P1" },
  { id: "w03", title: "Metadata source-of-truth map", description: "Map existing metadata sources across systems to identify gaps, duplicates, and the authoritative source for each field.", quarter: "Q3 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "SPIKE", priority: "P1" },
  { id: "w04", title: "Editorial review + override model", description: "Define the editorial review workflow and override mechanisms for AI-generated content decisions.", quarter: "Q3 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "DISCOVERY", priority: "P1" },
  { id: "w05", title: "Story ordering + related content recommendations", description: "Spike how ML-based story ordering and related content recommendations could be integrated into the Catch-Up feed.", quarter: "Q3 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "SPIKE", priority: "P2" },
  { id: "w06", title: "AI-assisted package workflow prototype", description: "Build a prototype of the AI-assisted editorial workflow for creating and curating Catch-Up packages.", quarter: "Q4 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "BUILD", priority: "P1" },
  { id: "w07", title: "Summary/context drafting workflow", description: "Spike and prototype an AI-assisted drafting workflow for summaries and contextual blurbs.", quarter: "Q4 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "SPIKE", priority: "P1" },
  { id: "w08", title: "AI-assisted ordering test", description: "Test ML-based ordering of stories and packages within the Catch-Up experience.", quarter: "Q4 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "TEST", priority: "P2", dependencies: ["Story ordering spike"] },
  { id: "w09", title: "Review model with Programming / Editorial", description: "Pilot the AI review model with Programming and Editorial partners to validate accuracy and trust.", quarter: "Q4 2026", swimlane: "Workflow Intelligence + AI/ML", tag: "TEST", priority: "P2" },
  { id: "w10", title: "Workflow intelligence v1", description: "Launch v1 of workflow intelligence capabilities for editorial teams, covering auto-hydration and assisted drafting.", quarter: "Q1 2027", swimlane: "Workflow Intelligence + AI/ML", tag: "SCALE", priority: "P1" },
  { id: "w11", title: "Reusable metadata + package schema", description: "Standardize and publish the reusable metadata and package schema to enable consistent AI/ML integration.", quarter: "Q1 2027", swimlane: "Workflow Intelligence + AI/ML", tag: "SCALE", priority: "P2" },
  { id: "w12", title: "AI/ML partner operating model", description: "Establish the operating model for working with AI/ML partners across CAL workstreams.", quarter: "Q1 2027", swimlane: "Workflow Intelligence + AI/ML", tag: "SCALE", priority: "P2" },

  // ── Timeline / Storyline Navigation ─────────────────────────────
  { id: "t01", title: "Storyline Navigation current-state readout", description: "Audit and document the current state of storyline and timeline navigation across CNN products.", quarter: "Q3 2026", swimlane: "Timeline / Storyline Navigation", tag: "DISCOVERY", priority: "P1" },
  { id: "t02", title: "Timeline / explainer concept brief", description: "Develop a concept brief for timeline and explainer experiences targeting breaking and evolving stories.", quarter: "Q3 2026", swimlane: "Timeline / Storyline Navigation", tag: "DISCOVERY", priority: "P1" },
  { id: "t03", title: "Candidate story / use-case map", description: "Map the best candidate stories and use cases for storyline navigation based on editorial patterns.", quarter: "Q3 2026", swimlane: "Timeline / Storyline Navigation", tag: "DISCOVERY", priority: "P1" },
  { id: "t04", title: "Partner readiness — Events, Visuals, Liz, Manav, Vic", description: "Conduct partner readiness conversations with Events & Visuals team and key editorial stakeholders.", quarter: "Q3 2026", swimlane: "Timeline / Storyline Navigation", tag: "DISCOVERY", priority: "P1" },
  { id: "t05", title: "Prototype recommendation", description: "Produce a recommendation for which storyline/timeline concept to prototype in Q4 based on discovery outputs.", quarter: "Q3 2026", swimlane: "Timeline / Storyline Navigation", tag: "TEST", priority: "P2" },
  { id: "t06", title: "Timeline / Storyline MVP candidate", description: "Build the MVP candidate for the timeline/storyline navigation experience chosen in Q3.", quarter: "Q4 2026", swimlane: "Timeline / Storyline Navigation", tag: "BUILD", priority: "P1", dependencies: ["Prototype recommendation"] },
  { id: "t07", title: "Single-storyline Catch-Up prototype", description: "Prototype a single-storyline Catch-Up experience that allows deep-dive into one evolving news story.", quarter: "Q4 2026", swimlane: "Timeline / Storyline Navigation", tag: "TEST", priority: "P1" },
  { id: "t08", title: "Visual timeline / explainer pattern", description: "Test a visual timeline pattern for stories with multiple events and actors, validated with user research.", quarter: "Q4 2026", swimlane: "Timeline / Storyline Navigation", tag: "TEST", priority: "P2" },
  { id: "t09", title: '"What changed since I last checked" concept', description: "Test a concept that surfaces delta content for users returning to an ongoing story.", quarter: "Q4 2026", swimlane: "Timeline / Storyline Navigation", tag: "TEST", priority: "P2" },
  { id: "t10", title: "Storyline Navigation pattern", description: "Define and publish the Storyline Navigation pattern as a reusable standard for ongoing story coverage.", quarter: "Q1 2027", swimlane: "Timeline / Storyline Navigation", tag: "SCALE", priority: "P1" },
  { id: "t11", title: "Timeline / explainer standard", description: "Standardize the visual timeline and explainer format for editorial and product teams to implement.", quarter: "Q1 2027", swimlane: "Timeline / Storyline Navigation", tag: "SCALE", priority: "P2" },
  { id: "t12", title: "Integration with Catch-Up and Go Deeper", description: "Connect Storyline Navigation to Catch-Up packages and Go Deeper surfaces for a unified experience.", quarter: "Q1 2027", swimlane: "Timeline / Storyline Navigation", tag: "SCALE", priority: "P2", dependencies: ["Daily Story system pattern", "Workflow intelligence v1"] },

  // ── Surface + Daypart Expansion ──────────────────────────────────
  { id: "s01", title: "App + cross-surface expansion assessment", description: "Assess the opportunity for expanding Catch-Up and Daily Story across app surfaces, including lower-feed and entry points.", quarter: "Q3 2026", swimlane: "Surface + Daypart Expansion", tag: "DISCOVERY", priority: "P1" },
  { id: "s02", title: "Nighttime Catch-Up discovery", description: "Research and define the concept for a nighttime or evening Catch-Up daypart experience.", quarter: "Q3 2026", swimlane: "Surface + Daypart Expansion", tag: "DISCOVERY", priority: "P2" },
  { id: "s03", title: "Lower-feed ICYMI / Trending Catch-Up", description: "Explore an ICYMI or Trending Catch-Up placement in the lower editorial feed.", quarter: "Q3 2026", swimlane: "Surface + Daypart Expansion", tag: "DISCOVERY", priority: "P2" },
  { id: "s04", title: "All Access / video Catch-Up brief", description: "Draft a brief for a video-first or All Access Catch-Up format.", quarter: "Q3 2026", swimlane: "Surface + Daypart Expansion", tag: "DISCOVERY", priority: "P2" },
  { id: "s05", title: "App Value / Web-to-App Continuation concept", description: "Explore a web-to-app continuation concept that creates value and drives app install or re-engagement.", quarter: "Q3 2026", swimlane: "Surface + Daypart Expansion", tag: "DISCOVERY", priority: "P3" },
  { id: "s06", title: "App entry point test candidate", description: "Test a new Catch-Up entry point in the app to improve discoverability and daily habit formation.", quarter: "Q4 2026", swimlane: "Surface + Daypart Expansion", tag: "TEST", priority: "P1" },
  { id: "s07", title: "Nighttime Catch-Up prototype", description: "Prototype and pilot a Nighttime Catch-Up experience for evening news consumption.", quarter: "Q4 2026", swimlane: "Surface + Daypart Expansion", tag: "TEST", priority: "P2" },
  { id: "s08", title: "Lower-feed ICYMI module", description: "Test the lower-feed ICYMI module with real editorial content and measure engagement lift.", quarter: "Q4 2026", swimlane: "Surface + Daypart Expansion", tag: "TEST", priority: "P2" },
  { id: "s09", title: "Web-to-app continuation test", description: "Test a web-to-app continuation mechanic that bridges breaking news discovery on web to deeper engagement in app.", quarter: "Q4 2026", swimlane: "Surface + Daypart Expansion", tag: "TEST", priority: "P2" },
  { id: "s10", title: "All Access / video Catch-Up pilot candidate", description: "Pilot an All Access or video-first Catch-Up format with a limited editorial and user cohort.", quarter: "Q4 2026", swimlane: "Surface + Daypart Expansion", tag: "TEST", priority: "P3" },
  { id: "s11", title: "App + Web parity plan", description: "Define and ship a parity plan ensuring consistent Catch-Up and Daily Story experiences across app and web.", quarter: "Q1 2027", swimlane: "Surface + Daypart Expansion", tag: "SCALE", priority: "P1" },
  { id: "s12", title: "Daypart-based Catch-Up model", description: "Standardize the daypart-based content model for morning, midday, and evening Catch-Up editions.", quarter: "Q1 2027", swimlane: "Surface + Daypart Expansion", tag: "SCALE", priority: "P2" },
  { id: "s13", title: "Web-to-app continuation pattern", description: "Publish the web-to-app continuation pattern for reuse across editorial surfaces and campaigns.", quarter: "Q1 2027", swimlane: "Surface + Daypart Expansion", tag: "SCALE", priority: "P2" },

  // ── Features Programming + Richer Storytelling ───────────────────
  { id: "f01", title: "Define Features FLEX test candidate", description: "Identify the best Features Home or lower-feed hypothesis to test via FLEX in Q4.", quarter: "Q3 2026", swimlane: "Features Programming + Richer Storytelling", tag: "DISCOVERY", priority: "P1" },
  { id: "f02", title: "DART measurement + guardrails alignment", description: "Align with DART and Analytics on measurement framework and test guardrails for Features experiments.", quarter: "Q3 2026", swimlane: "Features Programming + Richer Storytelling", tag: "DISCOVERY", priority: "P1" },
  { id: "f03", title: 'Lower-feed "Check These Out" concept', description: "Develop the concept for a curated lower-feed module surfacing underexposed Features content.", quarter: "Q3 2026", swimlane: "Features Programming + Richer Storytelling", tag: "DISCOVERY", priority: "P2" },
  { id: "f04", title: "Direct vs CTA framework", description: "Define and validate a Direct vs CTA framework for Features content to guide editorial and product decisions.", quarter: "Q3 2026", swimlane: "Features Programming + Richer Storytelling", tag: "DISCOVERY", priority: "P2" },
  { id: "f05", title: "Interactives business case + partner map", description: "Build the business case for Interactives within Catch-Up and map partner dependencies.", quarter: "Q3 2026", swimlane: "Features Programming + Richer Storytelling", tag: "DISCOVERY", priority: "P2" },
  { id: "f06", title: "A/V and talent-led analysis candidates", description: "Identify candidate A/V formats and talent-led analysis concepts for Q4 testing.", quarter: "Q3 2026", swimlane: "Features Programming + Richer Storytelling", tag: "DISCOVERY", priority: "P3" },
  { id: "f07", title: "Features FLEX experiment", description: "Run a FLEX experiment for the selected Features Home or lower-feed programming hypothesis.", quarter: "Q4 2026", swimlane: "Features Programming + Richer Storytelling", tag: "TEST", priority: "P1", dependencies: ["DART guardrails alignment"] },
  { id: "f08", title: '"Check These Out" module pilot', description: "Pilot the Check These Out lower-feed module with curated Features content.", quarter: "Q4 2026", swimlane: "Features Programming + Richer Storytelling", tag: "TEST", priority: "P2" },
  { id: "f09", title: "Direct vs CTA richer format pilot", description: "Pilot richer formats using the Direct vs CTA framework validated in Q3.", quarter: "Q4 2026", swimlane: "Features Programming + Richer Storytelling", tag: "TEST", priority: "P2" },
  { id: "f10", title: "Visual explainer / interactive preview test", description: "Test a visual explainer or interactive preview format within Catch-Up or Features.", quarter: "Q4 2026", swimlane: "Features Programming + Richer Storytelling", tag: "TEST", priority: "P2" },
  { id: "f11", title: "Talent-led analysis card test", description: "Test a talent-led analysis card format with a selected editorial partner.", quarter: "Q4 2026", swimlane: "Features Programming + Richer Storytelling", tag: "TEST", priority: "P3" },
  { id: "f12", title: "Features programming pattern", description: "Define the Features programming pattern as a reusable standard for editorial and product teams.", quarter: "Q1 2027", swimlane: "Features Programming + Richer Storytelling", tag: "SCALE", priority: "P1" },
  { id: "f13", title: "Richer format integration standards", description: "Publish standards for integrating richer formats (Interactives, A/V, explainers) into Catch-Up surfaces.", quarter: "Q1 2027", swimlane: "Features Programming + Richer Storytelling", tag: "SCALE", priority: "P2" },
  { id: "f14", title: "Interactives metadata and distribution model", description: "Establish the metadata and distribution model for Interactives to enable reuse across the platform.", quarter: "Q1 2027", swimlane: "Features Programming + Richer Storytelling", tag: "SCALE", priority: "P2" },

  // ── Operating Model + Partner Readiness ──────────────────────────
  { id: "o01", title: "Define CAL / Storytelling operating model", description: "Draft and socialize the operating model for the Content Accelerator Lab, including team structure and decision rights.", quarter: "Q3 2026", swimlane: "Operating Model + Partner Readiness", tag: "DISCOVERY", priority: "P1" },
  { id: "o02", title: "Partner-readiness conversations", description: "Conduct structured readiness conversations with key partner teams across App, Web, Analytics, and UXR.", quarter: "Q3 2026", swimlane: "Operating Model + Partner Readiness", tag: "DISCOVERY", priority: "P1" },
  { id: "o03", title: "Principal Engineer / Technical Strategy model", description: "Define the Principal Engineer partnership model and technical strategy approach for CAL workstreams.", quarter: "Q3 2026", swimlane: "Operating Model + Partner Readiness", tag: "DISCOVERY", priority: "P1" },
  { id: "o04", title: "Attached delivery / away-team assumptions", description: "Document and pressure-test the attached delivery and away-team assumptions for Q4 pilot.", quarter: "Q3 2026", swimlane: "Operating Model + Partner Readiness", tag: "DISCOVERY", priority: "P1" },
  { id: "o05", title: "Governance + prioritization model", description: "Define the governance and prioritization model for managing competing demands across CAL workstreams.", quarter: "Q3 2026", swimlane: "Operating Model + Partner Readiness", tag: "DISCOVERY", priority: "P1" },
  { id: "o06", title: "Success metrics for horizontal", description: "Define success metrics for the CAL horizontal model, including OKRs and leading indicators.", quarter: "Q3 2026", swimlane: "Operating Model + Partner Readiness", tag: "DISCOVERY", priority: "P1" },
  { id: "o07", title: "Attached delivery pilot model", description: "Pilot the attached delivery model with one active workstream to validate team structure and handoff patterns.", quarter: "Q4 2026", swimlane: "Operating Model + Partner Readiness", tag: "TEST", priority: "P1" },
  { id: "o08", title: "Principal Engineer partnership in active spikes", description: "Test the Principal Engineer engagement model by embedding in active technical spikes.", quarter: "Q4 2026", swimlane: "Operating Model + Partner Readiness", tag: "TEST", priority: "P1" },
  { id: "o09", title: "Roadmap intake / prioritization process", description: "Pilot a formal roadmap intake and prioritization process with leadership and partner teams.", quarter: "Q4 2026", swimlane: "Operating Model + Partner Readiness", tag: "TEST", priority: "P2" },
  { id: "o10", title: "Monthly leadership readout cadence", description: "Establish and run a monthly leadership readout cadence to maintain alignment and surface decisions.", quarter: "Q4 2026", swimlane: "Operating Model + Partner Readiness", tag: "TEST", priority: "P2" },
  { id: "o11", title: "Horizontal operating model v1", description: "Launch v1 of the horizontal CAL operating model, covering team structure, governance, and partner integration.", quarter: "Q1 2027", swimlane: "Operating Model + Partner Readiness", tag: "SCALE", priority: "P1" },
  { id: "o12", title: "Partner intake process", description: "Standardize and publish the partner intake process for new workstream requests.", quarter: "Q1 2027", swimlane: "Operating Model + Partner Readiness", tag: "SCALE", priority: "P1" },
  { id: "o13", title: "Reusable discovery-to-MVP playbook", description: "Document and publish the discovery-to-MVP playbook for use by future CAL workstreams.", quarter: "Q1 2027", swimlane: "Operating Model + Partner Readiness", tag: "SCALE", priority: "P2" },
];
