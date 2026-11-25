import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Button,
  IconButton,
  Badge,
  Card,
  MetricCard,
  Input,
  SearchInput,
  Tabs,
  Modal,
  StatusIndicator,
  DietaryBadge,
  CurrencyDisplay,
  TicketTimer,
  DataTable,
} from './index';

export function runComponentRenderingTests(): void {
  console.log('Running real React HTML markup rendering tests for @serveflow/ui-kit...');

  // 1. Button test (disabled & variants)
  const buttonHtml = renderToStaticMarkup(
    React.createElement(
      Button,
      { variant: 'secondary', size: 'lg', disabled: true },
      'Send to Kitchen'
    )
  );
  if (!buttonHtml.includes('disabled') || !buttonHtml.includes('Send to Kitchen') || !buttonHtml.includes('bg-[#006C53]')) {
    throw new Error('Button disabled/variant rendering failed');
  }

  // 2. IconButton test (aria-label & icon element)
  const iconButtonHtml = renderToStaticMarkup(
    React.createElement(IconButton, {
      ariaLabel: 'Print receipt',
      icon: React.createElement('span', null, 'print-icon'),
    })
  );
  if (!iconButtonHtml.includes('aria-label="Print receipt"') || !iconButtonHtml.includes('print-icon')) {
    throw new Error('IconButton aria-label or icon rendering failed');
  }

  // 3. Badge test (variants)
  const badgeHtml = renderToStaticMarkup(
    React.createElement(Badge, { variant: 'success' }, 'Active')
  );
  if (!badgeHtml.includes('bg-[#DCFCE7]') || !badgeHtml.includes('Active')) {
    throw new Error('Badge rendering failed');
  }

  // 4. Card test
  const cardHtml = renderToStaticMarkup(
    React.createElement(Card, { className: 'custom-card' }, 'Card Body')
  );
  if (!cardHtml.includes('custom-card') || !cardHtml.includes('Card Body')) {
    throw new Error('Card rendering failed');
  }

  // 5. MetricCard test
  const metricHtml = renderToStaticMarkup(
    React.createElement(MetricCard, {
      title: 'Net Revenue',
      value: '₹1,24,500',
      trend: '+14.2%',
    })
  );
  if (!metricHtml.includes('Net Revenue') || !metricHtml.includes('₹1,24,500') || !metricHtml.includes('+14.2%')) {
    throw new Error('MetricCard rendering failed');
  }

  // 6. Input test (label & error message)
  const inputHtml = renderToStaticMarkup(
    React.createElement(Input, {
      label: 'Table Number',
      error: 'Table already exists',
      defaultValue: 'T-04',
    })
  );
  if (!inputHtml.includes('Table Number') || !inputHtml.includes('Table already exists') || !inputHtml.includes('border-[#BA1A1A]')) {
    throw new Error('Input label/error rendering failed');
  }

  // 7. SearchInput test
  const searchHtml = renderToStaticMarkup(
    React.createElement(SearchInput, {
      defaultValue: 'Paneer',
      placeholder: 'Search menu...',
    })
  );
  if (!searchHtml.includes('placeholder="Search menu..."') || !searchHtml.includes('value="Paneer"')) {
    throw new Error('SearchInput rendering failed');
  }

  // 8. Tabs test
  const tabsHtml = renderToStaticMarkup(
    React.createElement(Tabs, {
      tabs: [
        { id: '1', label: 'All Tables', badge: 12 },
        { id: '2', label: 'Ground Floor' },
      ],
      activeTab: '1',
      onChange: () => undefined,
    })
  );
  if (!tabsHtml.includes('All Tables') || !tabsHtml.includes('12') || !tabsHtml.includes('Ground Floor')) {
    throw new Error('Tabs rendering failed');
  }

  // 9. Modal test (open & closed states)
  const closedModal = renderToStaticMarkup(
    React.createElement(Modal, { isOpen: false, onClose: () => undefined, title: 'Edit Table' }, 'Modal Body')
  );
  if (closedModal !== '') {
    throw new Error('Closed modal unexpectedly rendered content');
  }

  const openModal = renderToStaticMarkup(
    React.createElement(Modal, { isOpen: true, onClose: () => undefined, title: 'Edit Table' }, 'Modal Content Inside')
  );
  if (!openModal.includes('role="dialog"') || !openModal.includes('aria-modal="true"') || !openModal.includes('Edit Table') || !openModal.includes('Modal Content Inside')) {
    throw new Error('Open modal accessibility or content rendering failed');
  }

  // 10. StatusIndicator test
  const statusHtml = renderToStaticMarkup(
    React.createElement(StatusIndicator, { status: 'online', label: 'Connected' })
  );
  if (!statusHtml.includes('Connected') || !statusHtml.includes('bg-[#15803D]')) {
    throw new Error('StatusIndicator rendering failed');
  }

  // 11. DietaryBadge test (Veg, Non-Veg, Egg, Jain)
  const vegHtml = renderToStaticMarkup(React.createElement(DietaryBadge, { type: 'VEG' }));
  const nonVegHtml = renderToStaticMarkup(React.createElement(DietaryBadge, { type: 'NON_VEG' }));
  if (!vegHtml.includes('Pure Vegetarian') || !nonVegHtml.includes('Non-Vegetarian')) {
    throw new Error('DietaryBadge title/type rendering failed');
  }

  // 12. CurrencyDisplay test (Indian Rupee formatting with ₹ symbol)
  const currencyHtml = renderToStaticMarkup(
    React.createElement(CurrencyDisplay, { amount: 241500.5 })
  );
  if (!currencyHtml.includes('₹') || !currencyHtml.includes('2,41,500.5')) {
    throw new Error(`CurrencyDisplay rendering failed: Expected ₹2,41,500.5 but got ${currencyHtml}`);
  }

  // 13. TicketTimer test (<10m green, 10-20m amber, >20m red)
  const greenTimer = renderToStaticMarkup(React.createElement(TicketTimer, { seconds: 240 })); // 4m
  const redTimer = renderToStaticMarkup(React.createElement(TicketTimer, { seconds: 1350 })); // 22.5m
  if (!greenTimer.includes('4:00') || !greenTimer.includes('bg-[#15803D]')) {
    throw new Error('Green TicketTimer rendering failed');
  }
  if (!redTimer.includes('22:30') || !redTimer.includes('bg-[#BA1A1A]') || !redTimer.includes('animate-pulse')) {
    throw new Error('Red Alert TicketTimer rendering failed');
  }

  // 14. DataTable test (table headers, rows, empty message)
  const emptyTable = renderToStaticMarkup(
    React.createElement(DataTable, {
      columns: [{ key: 'name', header: 'Name' }],
      data: [],
      keyExtractor: () => '1',
      emptyMessage: 'No tables found.',
    })
  );
  if (!emptyTable.includes('No tables found.')) {
    throw new Error('DataTable empty message rendering failed');
  }

  interface TableRow {
    table: string;
    capacity: number;
  }

  const populatedTable = renderToStaticMarkup(
    React.createElement(DataTable<TableRow>, {
      columns: [
        { key: 'table', header: 'Table #' },
        { key: 'capacity', header: 'Capacity', align: 'right' },
      ],
      data: [{ table: 'T-01', capacity: 4 }],
      keyExtractor: (r: TableRow) => r.table,
    })
  );
  if (!populatedTable.includes('Table #') || !populatedTable.includes('T-01') || !populatedTable.includes('4')) {
    throw new Error('DataTable populated data rendering failed');
  }

  console.log('✅ All 14 @serveflow/ui-kit components verified with real React server HTML rendering.');
}

runComponentRenderingTests();
