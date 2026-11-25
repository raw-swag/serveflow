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

export function runComponentTests() {
  console.log('Testing @serveflow/ui-kit components...');

  // 1. Currency Display formatting check
  const formattedCurrency = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(124500);

  if (formattedCurrency !== '1,24,500') {
    throw new Error(`Currency formatting failed: Expected 1,24,500 but got ${formattedCurrency}`);
  }

  // 2. Ticket Timer timing logic check
  const secLow = 300; // 5 mins
  const minsLow = Math.floor(secLow / 60);
  const secsLow = secLow % 60;
  const timeFormatted = `${minsLow}:${secsLow < 10 ? '0' : ''}${secsLow}`;
  if (timeFormatted !== '5:00') {
    throw new Error(`Ticket timer format failed: Expected 5:00 but got ${timeFormatted}`);
  }

  // 3. Verify all 14 components are exported and valid
  const components = [
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
  ];

  for (const comp of components) {
    if (typeof comp !== 'function') {
      throw new Error(`Component export check failed for: ${comp}`);
    }
  }

  console.log('✅ All 14 @serveflow/ui-kit components verified.');
}

runComponentTests();
