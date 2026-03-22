/**
 * Registers all vanilla components under unified <chevp-*> tag names.
 * Import this module for side-effect registration.
 */
import { ChevpBadge } from './components/badge/chevp-badge.js';
import { ChevpPanel } from './components/panel/chevp-panel.js';
import { ChevpStatCard } from './components/stat-card/chevp-stat-card.js';
import { ChevpProfileCard } from './components/profile-card/chevp-profile-card.js';
import { ChevpDataTable } from './components/data-table/chevp-data-table.js';
import { ChevpTaskList } from './components/task-list/chevp-task-list.js';
import { ChevpBarChart } from './components/bar-chart/chevp-bar-chart.js';
import { ChevpTimeline, ChevpTimelineItem } from './components/timeline/chevp-timeline.js';
import { ChevpSchedule } from './components/schedule/chevp-schedule.js';
import { ChevpDocEditor } from './components/doc-editor/chevp-doc-editor.js';
import { ChevpWorkspace } from './components/workspace/chevp-workspace.js';

const defs: [string, CustomElementConstructor][] = [
  ['chevp-badge', ChevpBadge],
  ['chevp-panel', ChevpPanel],
  ['chevp-stat-card', ChevpStatCard],
  ['chevp-profile-card', ChevpProfileCard],
  ['chevp-data-table', ChevpDataTable],
  ['chevp-task-list', ChevpTaskList],
  ['chevp-bar-chart', ChevpBarChart],
  ['chevp-timeline', ChevpTimeline],
  ['chevp-timeline-item', ChevpTimelineItem],
  ['chevp-schedule', ChevpSchedule],
  ['chevp-doc-editor', ChevpDocEditor],
  ['chevp-workspace', ChevpWorkspace],
];

for (const [tag, ctor] of defs) {
  if (!customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
}
