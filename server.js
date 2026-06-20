// const express = require("express");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// // app.get('/', async (req, res) =>"server is start")

// app.get("/api/data", async (req, res) => {
//   try {
//     const url = "https://sarkariresult.com.cm/";
//      console.log("click ho raha hai")
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);

//     let data = [];

//     $("wp-block-latest-posts__post-title").each((i, el) => {
//       data.push($(el).text());
//     });

//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Error scraping" });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));









// const express = require("express");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const cors = require("cors");
// const puppeteer = require("puppeteer");

// const app = express();
// app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Server is running 🚀");
// });

// app.get("/api/data", async (req, res) => {
//     try {
//         const url = "https://www.sarkariresult.com/";

//        // console.log("API hit ho raha hai ✅");

//         const response = await axios.get(url, {
//             headers: {
//                 "User-Agent": "Mozilla/5.0"
//             }
//         });

//         const $ = cheerio.load(response.data);

//         let data = [];

//         // 🔥 Correct class selector
//         // $(".wp-block-latest-posts__post-title").each((i, el) => {
//         //   data.push($(el).text().trim());
//         // });

//         $(".wp-block-latest-posts__post-title").each((i, el) => {
//             data.push({
//                 title: $(el).text().trim(),
//                 link: $(el).attr("href")
//             });
//         });







//         // fallback (agar upar wala kaam na kare)
//         if (data.length === 0) {
//             $("a").each((i, el) => {
//                 const text = $(el).text().trim();
//                 const link = $(el).attr("href");

//                 if (text.length > 30 && link) {
//                     data.push({
//                         title: text,
//                         link: link
//                     });
//                 }
//             });
//         }

//         res.json({
//             success: true,
//             count: data.length,
//             data: data
//         });

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({
//             success: false,
//             error: "Scraping failed ❌"
//         });
//     }
// });




// async function loginAndScrape(number) {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto("https://balloondekor.com/");


//     // Click login

//     // Click login
//     await page.waitForSelector('button[aria-label="Sign In"]');
//     await page.click('button[aria-label="Sign In"]');

//     // Enter number
//     await page.waitForSelector('input[type="tel"]');
//     await page.type('input[type="tel"]', number);


//     // await page.evaluate(() => {
//     //     const buttons = [...document.querySelectorAll("button")];
//     //     const btn = buttons.find(b => b.innerText.includes("Send Verification Code"));
//     //     if (btn) btn.click();
//     // });

//     // await page.waitForSelector('button[aria-label="Close"]');
//     // await page.click('button[aria-label="Close"]');



//     // Wait for navigation
//     //await page.waitForNavigation();

//     // Get data
//     //   const data = await page.evaluate(() => {
//     //     return document.querySelector("h1").innerText;
//     //   });


//     await browser.close();
// }





// let isRunning = false;
// let currentNumber = null;

// async function runLoop() {
//   if (!isRunning) return;

//   try {
//    // console.log("Running for:", currentNumber);
//     await loginAndScrape(currentNumber);
//   } catch (err) {
//     console.error("Error:", err.message);
//   }

//   // run again after 30 seconds
//   setTimeout(runLoop, 3000);
// }

// // START API
// app.get("/login", async (req, res) => {
//   const number = req.query.num; // ✅ correct for GET
  

//   if (!number) {
//     return res.send("Number is required");
//   }

//   if (isRunning) {
//     return res.send("Already running...");
//   }

//   isRunning = true;
//   currentNumber = number;

//   runLoop();

//   res.send("Started loop (every 10s)");
// });

// // STOP API (important 🔥)
// app.get("/stop", (req, res) => {
//   isRunning = false;
//   currentNumber = null;

//   res.send("Stopped");
// });









// // app.get("/login", async (req, res) => {
// //   await loginAndScrape();
// //   res.send("Login done");
// // });







// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000 🚀");
// });






const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());
app.use(express.json());

let isRunning = false;
let currentNumber = null;

// ✅ Home
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ✅ Scraping API
app.get("/api/data", async (req, res) => {
  try {
    const response = await axios.get("https://www.sarkariresult.com/", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(response.data);
    let data = [];

    $(".wp-block-latest-posts__post-title").each((i, el) => {
      data.push({
        title: $(el).text().trim(),
        link: $(el).attr("href"),
      });
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Puppeteer Function (FIXED 🔥)
async function loginAndScrape(number) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36"
  );

  await page.goto("https://balloondekor.com/", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector('button[aria-label="Sign In"]');
  await page.click('button[aria-label="Sign In"]');

  await page.waitForSelector('input[type="tel"]');
  await page.type('input[type="tel"]', number);

  // 🔥 Click OTP button
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      b.innerText.includes("Send Verification Code")
    );
    if (btn) btn.click();
  });

  await page.waitForTimeout(5000);

  await browser.close();
}

// ✅ Loop
async function runLoop() {
  if (!isRunning) return;

  try {
    await loginAndScrape(currentNumber);
  } catch (err) {
    console.log(err.message);
  }

  setTimeout(runLoop, 10000); // 10 sec
}

// ✅ START
app.get("/login", (req, res) => {
  const number = req.query.num;

  if (!number) return res.send("Number required");

  if (isRunning) return res.send("Already running");

  isRunning = true;
  currentNumber = number;

  runLoop();

  res.send("Started");
});

// ✅ STOP
app.get("/stop", (req, res) => {
  isRunning = false;
  currentNumber = null;
  res.send("Stopped");
});

// ✅ PORT FIX (IMPORTANT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));