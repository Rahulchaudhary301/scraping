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



// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000 🚀");
// });

















// ==============================
// ✅ SCRAPING API
// ==============================




// app.get("/api/data", async (req, res) => {
//   try {
//     const response = await axios.get("https://www.sarkariresult.com/", {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
//         "Accept-Language": "en-US,en;q=0.9",
//       },
//       timeout: 10000,
//     });

//     const $ = cheerio.load(response.data);
//     let data = [];

//     $(".wp-block-latest-posts__post-title").each((i, el) => {
//       data.push({
//         title: $(el).text().trim(),
//         link: $(el).attr("href"),
//       });
//     });

//     // fallback
//     if (data.length === 0) {
//       $("a").each((i, el) => {
//         const text = $(el).text().trim();
//         const link = $(el).attr("href");

//         if (text.length > 30 && link) {
//           data.push({
//             title: text,
//             link: link,
//           });
//         }
//       });
//     }

//     res.json({
//       success: true,
//       count: data.length,
//       data,
//     });

//   } catch (err) {
//     console.log("Scraping error:", err.message);

//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });










const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();

// ✅ Middlewares
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

// ✅ Home Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ==============================
// 🔥 MAIN FUNCTION
async function loginAndScrape(number) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false, // 👈 DEBUG (baad me true kar dena)
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage"
      ]
    });

    const page = await browser.newPage();

    await page.goto("https://balloondekor.com/", {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    console.log("✅ Page Loaded");

    // ⏳ wait (NO waitForTimeout)
    await new Promise(res => setTimeout(res, 3000));

    // ✅ CLICK SIGN IN (dynamic)
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const btn = buttons.find(b =>
        b.innerText.toLowerCase().includes("sign")
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    console.log("👉 Sign clicked:", clicked);

    if (!clicked) throw new Error("Sign button not found ❌");

    // ⏳ wait modal
    await new Promise(res => setTimeout(res, 5000));

    // ✅ FIND INPUT FIELD (SMART WAY)
    const inputHandle = await page.evaluateHandle(() => {
      const inputs = Array.from(document.querySelectorAll("input"));

      return inputs.find(inp =>
        inp.type === "tel" ||
        inp.placeholder?.toLowerCase().includes("mobile") ||
        inp.name?.toLowerCase().includes("phone")
      ) || null;
    });

    const input = inputHandle.asElement();

    if (!input) {
      throw new Error("Mobile input not found ❌");
    }

    // ✅ TYPE NUMBER
    await input.type(number, { delay: 100 });

    console.log("📱 Number Entered");

    // ✅ PRESS ENTER
    await page.keyboard.press("Enter");

    // ⏳ wait OTP trigger
    await new Promise(res => setTimeout(res, 5000));

    console.log("🎉 OTP Triggered");

  } catch (err) {
    console.error("❌ Puppeteer Error:", err.message);
    throw err;

  } finally {
    if (browser) await browser.close();
  }
}

// ==============================

let isRunning = false;

// ✅ LOGIN API
app.get("/login", async (req, res) => {
  const number = req.query.num;

  if (!number) {
    return res.status(400).send("Number required ❌");
  }

  if (isRunning) {
    return res.send("Already running ⏳");
  }

  isRunning = true;

  try {
    await loginAndScrape(number);
    res.send("OTP Triggered ✅");

  } catch (err) {
    res.status(500).send("Failed ❌");

  } finally {
    isRunning = false;
  }
});

// ✅ STOP API
app.get("/stop", (req, res) => {
  isRunning = false;
  res.send("Stopped 🛑");
});

// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});