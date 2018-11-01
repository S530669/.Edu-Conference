var webdriver = require('selenium-webdriver');

By = webdriver.By;
until = webdriver.until;

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build()

driver.get('localhost:8082/users/login');
driver.findElement(By.name('username')).sendKeys('Darshan');
driver.findElement(By.name('password')).sendKeys('1234');
driver.findElement(By.name('submit')).click();

function check_title() {
    var promise = driver.getTitle().then( function(title){
        if(title === 'wiki - Google Search')
        {
            console.log('success');
            return true
        }
        else{
            console.log('fail --'+ title);
        }
    });
    return promise;
}
