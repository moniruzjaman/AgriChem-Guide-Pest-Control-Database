import React from 'react';
import { SmartCollapsible } from './SmartCollapsible';

/**
 * TabContentCollapsible
 * =====================
 * Per-tab wrapper around each main tab's content: the tab body becomes a
 * SmartCollapsible so very long tab content starts collapsed while short tab
 * content stays open — and the user can always toggle either way (choice
 * persisted per tab). Keeps the tab headers/actions reachable on data-heavy
 * tabs like the database and guidebook.
 */

interface TabContentCollapsibleProps {
  /** Tab id — used as the persistence key. */
  tab: string;
  title: string;
  /** Optional trailing summary, e.g. live product count. */
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

export const TabContentCollapsible: React.FC<TabContentCollapsibleProps> = ({
  tab,
  title,
  subtitle,
  children,
}) => {
  return (
    <SmartCollapsible
      sectionKey={`tab-${tab}`}
      title={title}
      subtitle={subtitle}
      collapseThresholdPx={480}
    >
      {children}
    </SmartCollapsible>
  );
};
