/**
 * Registers all Material Design 3 components under unified <chevp-*> tag names.
 * Import this module for side-effect registration.
 */
import { ChevpMdBadge } from './components-md/badge/chevp-md-badge.js';
import { ChevpMdPanel } from './components-md/panel/chevp-md-panel.js';
import { ChevpMdStatCard } from './components-md/stat-card/chevp-md-stat-card.js';
import { ChevpMdProfileCard } from './components-md/profile-card/chevp-md-profile-card.js';
import { ChevpMdDataTable } from './components-md/data-table/chevp-md-data-table.js';
import { ChevpMdTaskList } from './components-md/task-list/chevp-md-task-list.js';
import { ChevpMdBarChart } from './components-md/bar-chart/chevp-md-bar-chart.js';
import { ChevpMdTimeline, ChevpMdTimelineItem } from './components-md/timeline/chevp-md-timeline.js';
import { ChevpMdSchedule } from './components-md/schedule/chevp-md-schedule.js';
import { ChevpMdDocEditor } from './components-md/doc-editor/chevp-md-doc-editor.js';
import { ChevpMdWorkspace } from './components-md/workspace/chevp-md-workspace.js';

const defs: [string, CustomElementConstructor][] = [
  ['chevp-badge', ChevpMdBadge],
  ['chevp-panel', ChevpMdPanel],
  ['chevp-stat-card', ChevpMdStatCard],
  ['chevp-profile-card', ChevpMdProfileCard],
  ['chevp-data-table', ChevpMdDataTable],
  ['chevp-task-list', ChevpMdTaskList],
  ['chevp-bar-chart', ChevpMdBarChart],
  ['chevp-timeline', ChevpMdTimeline],
  ['chevp-timeline-item', ChevpMdTimelineItem],
  ['chevp-schedule', ChevpMdSchedule],
  ['chevp-doc-editor', ChevpMdDocEditor],
  ['chevp-workspace', ChevpMdWorkspace],
];

for (const [tag, ctor] of defs) {
  if (!customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
}
