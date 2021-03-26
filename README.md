# FoodMe

### Prerequisites:
Before running test use should install NodeJS >12.0 at your environment:
https://nodejs.org/en/download/

### In order to start to work with the project, download it using command:
```
git clone https://github.com/AlexKarpinski/TestingAutomation.git
```

### Then load all dependencies:
```
npm install
```

### For running all tests perform the command
```
protractor protractor.conf.js --suite allSuites
```

### Allure report.
After tests execution is completed, results are loaded into allure-results folder.
Run the following to see allure report:
```
allure serve allure-results
```
