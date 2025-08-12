# Playwright TestAutomation Final Project

This repository contains automated end-to-end tests for demo application, built as the project for the Yet Another JS Course.

##  Technology Stack

- **Testing Framework**: [Playwright](https://playwright.dev/)
- **Language**: TypeScript
- **Test Runner**: Playwright Test Runner
- **Reporting**: HTML Reports

## 🔧 Prerequisites

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YevheniiaZh/YAJSC_PW_FP.git
cd YAJSC_PW_FP
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Debug mode
```bash
npx playwright test --debug
```

## 📊 Test Reports

After running tests, you can view the detailed HTML report:

```bash
npx playwright show-report
```

### Application Under Test

**Base URL**: https://practicesoftwaretesting.com


## 📚 Learning Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
