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

### For running all tests perform the command:
```
protractor protractor.conf.js --suite allSuites
```

### For running the smoke suite run command:
```
protractor protractor.conf.js --suite smoke
```

### For running the regression suite run command:
```
protractor protractor.conf.js --suite regression
```

### Allure report:
After tests execution is completed, results are loaded into allure-results folder.
To open allure report use the following command:
```
allure serve allure-results
```
Note: Before running tests it makes sense to delete allure-results folder if it is not empty:
Windows:
```
rmdir allure-results
```
Mac/linyx:
```
rm -rf allure-results
```
