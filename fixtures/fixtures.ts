import { test as base } from '@playwright/test';
import { AllPages } from '../pages/allPages';


type App  = {
    app: AllPages;
    loggedInApp: AllPages;
}

export const test = base.extend<App>({
 app: async({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
 },
loggedInApp: async({ browser }, use) => {
        const authFile = 'playwright/.auth/user.json';

        const context = await browser.newContext({ storageState: authFile });
        const page = await context.newPage();
        const app = new AllPages(page);
        await use(app);
        await context.close();
    },

});