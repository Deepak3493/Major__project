//node 1_HackerrankAutomation.js --url="https://www.hackerrank.com" --config=config.json
//npm init -y
//npm install minimst
// npm install
//npm install puppeteer-core

// let minimst =require("minimist");
// let fs=require("fs");
// let puppeteer=require("puppeteer");

// let args=minimst(process.argv);

// let configJSON=fs.readFileSync(args.config,"utf-8");
// let config=JSON.parse(configJSON);

// //headless false matlab dikhan chahiye khulte huye 
// //promise de rha likin brower open nhi kr rha
// let browserlaunchkapromise=puppeteer.launch({headless:false});

// //jab kr doge tab to browser milega na 
// browserlaunchkapromise.then(function(browser){
//      //page ka promise milega
//      //browser mila to page chahiye 
//      //pages function pages ka promise dega
//      let pagekaPromise=browser.pages();
//      //promise milne k baad
//      //jab promise pura hua tab mil gye 
//      pagekaPromise.then(function(page){
//          //url ko khulne ka promise
//          //page milne ke bad zeroth page kholo 
//          //lekin ye bhai sahab to promise de rhe hain
//         let urlopnekapromise=pages[0].goto(args.url);
//         //promise complete hone ka bad
//         //page open ho jayega na phir
//         urlopnekapromise.then(function(response){
//             //browser close hone ka promise milega
//             let closekapromise=browser.close();
//             //promise complete hone k bad band kr do
//             closekapromise.then(function(){
//                 clonsole.log("Browser is closed");
//             })
//         })


//      })
// })

// // drama krne ki jarurat nhi h agr apko cheej promise de rhi h to await laga do to seede apko mall mil jayega
// //replacement of aboce lines let browser=await puppeteer.launch({headless:false});
// //IIFEE ->immediately invoked execution
// //function likha phir function ko round bracket se surround kr diya
// // (function(){
// //     //i need to launch the brawser 
// //     let browser=await puppeteer.launch({headless:false});
// //     // i need to open a new page
// //     let page=await browser.newPage();
// // })



//async await is the direct method to handle the promises
// Demo for pupeteer to open browser and take snap of web page(Hacker rank)

/*Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.*/

let minimist = require("minimist");
let fs = require("fs");
let puppeteer = require("puppeteer");
// node puppeteerDemo.js --url=https://www.hackerrank.com/auth/login --config=config.JSON

// minimist is used to take the input in the dictionary format
let args = minimist(process.argv);

// read the file config.JSON
let configJSON = fs.readFileSync("config.JSON", "utf-8");
let config = JSON.parse(configJSON);


// await is used in function which have async keyword used before declaration
async function runmyfunction() {

    // Launching browser and getting pages
    let browser = await puppeteer.launch({
        // should be visible
        headless: false,
        //Set the defaultViewport option to null as above to disable the default resolution resolution. 
        //It takes the max resolution then.
        defaultViewport: null,
        //full size screen we can also use --start-fullscreen to make the default view as fullscreen
        // args is the indication for the chrome/browser which maximise the size 
        args: ['--start-maximized']
    });
    // open the bowser
    let pages = await browser.pages();
    // open the first tab
    let page = pages[0];
     
                    //page-01
    
    //go to url taken from the input
    await page.goto(args.url);
    await page.waitFor(3000);
    // wait to laod the selector then click over it
   await page.waitForSelector("a[data-event-action='Login']");
   await page.click("a[data-event-action='Login']");
                       
                   //page-02
   await page.waitFor(3000);
   await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
   await page.click("a[href='https://www.hackerrank.com/login']");
    

   // we will type username in the  input section slowly slowly with the delay of 30 ms
   await page.waitForSelector("input[name='username']");
   await page.type("input[name='username']",config.userid,{delay: 30});
   
   
    // we will type password in the  input section slowly slowly with the delay of 30 ms
   await page.waitForSelector("input[name='password']");
   await page.type("input[name='password']",config.password,{delay:30});
   
    await page.waitFor(3000);
    
    // button tag jisme data-analytics  variable ki value LoginPassword hai
    
    // press click on page3
    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");
                           

                           // page -03
    // click on compete
    await page.waitForSelector("a[data-analytics='NavBarContests']");
    await page.click("a[data-analytics='NavBarContests']");
    
    // click on manage contests
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");

    // // click on first contest
    // await page.waitForSelector("p.mmT");
    // await page.click("p.mmT");

    // await page.waitFor(3000);

    // // click on moderators tab
    // await page.waitForSelector("li[data-tab='moderators']");
    // await page.click("li[data-tab='moderators']");
    

    // // type in moderator
    // await page.waitForSelector("input#moderator");
    // await page.type("input#moderator", config.moderator, {delay: 100});
    //await page.keyboard.press("Enter");
    
    //diff between $eval and $$eval is that first one is for single querry selector while second one is for querry selector all;
    await page.waitForSelector("a[data-attr1='Last']");
    let numpages = await page.$eval("a[data-attr1='Last']",function(atag){
        let totalpages=parseInt(atag.getAttribute("data-page"));
        return totalpages;
    })

    //console.log(numpages);
    for(let i=1;i<=numpages;i++){
        await  gotoallPagesAndAddContests(page,browser);
        //as last page needs not to be clicked;
        if(i!=numpages){
            await page.waitForSelector("a[data-attr1='Right']");
            await page.click("a[data-attr1='Right']");
        }
    }
};

async function gotoallPagesAndAddContests(page,browser){
    //$$eval do  two things 1- run querry selector all on first arg and 2- pass the selected queried ans to function  as atags
    //This method runs Array.from(document.querySelectorAll(selector)) within the page and passes the result as the first argument to the pageFunction.
    //both the classes backbone and block-center are applied over the  anchor tab select that;
    await page.waitForSelector("a.backbone.block-center");
    let curls = await page.$$eval("a.backbone.block-center",function(atags){ //atags is the array of doms
           let urls=[];
           for(let i=0;i<atags.length;i++){
               let link=atags[i].getAttribute("href");
               urls.push(link);
           }
           return urls;
    });
    
   
    for (let i = 0; i < curls.length; i++) {
        let ctab = await browser.newPage();
        await saveModeratorInContest(ctab, args.url + curls[i], config.moderator);
        await ctab.close();
        await page.waitFor(3000);
    }
}

async function saveModeratorInContest(ctab, fullCurl, moderator) {
    await ctab.bringToFront();
    await ctab.goto(fullCurl);

    // click on moderators tab
    await ctab.waitForTimeout(3000);
    await ctab.waitForSelector("li[data-tab='moderators']");
    await ctab.click("li[data-tab='moderators']");
    
    // type in moderator
    await ctab.waitForSelector("input#moderator");
    await ctab.waitForTimeout(3000);
    await ctab.type("input#moderator", moderator, { delay: 50 });

    // press enter
    await ctab.waitForTimeout(3000);
    await ctab.keyboard.press("Enter");
    
}
runmyfunction();

/* note - if we enclose a function in a bracket and and after func body we can call it like ();
 this is will invoke the function automatically just after declaration  */
