import { test as base } from '@playwright/test';
import { AllPages } from '../pages/allPages';

type App  = {
    app: AllPages;
}

export const test = base.extend<App>({
 app: async({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
 },
});