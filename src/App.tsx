/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import RootLayout from '@/app/layout';
import HomePage from '@/app/page';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <RootLayout>
        <HomePage />
      </RootLayout>
    </ErrorBoundary>
  );
}

