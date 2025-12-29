import express from "express";
import { exec } from "child_process";
import fs from "fs-extra";
import crypto from "crypto";
import cors from "cors";
import { ext } from "./ext.js";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ limit: "200kb" }));

// async function safeRemove(dir, retries = 5) {
//   for (let i = 0; i < retries; i++) {
//     try {
//       await fs.remove(dir);
//       return;
//     } catch {
//       await new Promise(r => setTimeout(r, 200));
//     }
//   }
// }

app.post("/run", async (req, res) => {
  const { language, code, input = "" } = req.body;
  const id = crypto.randomUUID();
  const jobDir = path.join(process.cwd(), "jobs", id);

  try {
    await fs.ensureDir(jobDir);
    await fs.writeFile(path.join(jobDir, `main.${ext(language)}`), code);
    await fs.writeFile(path.join(jobDir, "input.txt"), input);

    const command = `docker run --rm --network none --memory 128m --cpus="0.5" -v "${jobDir}:/sandbox" sandbox-compiler ${language}`;

    exec(command, { timeout: 5000 }, async (err, stdout, stderr) => {

      await safeRemove(jobDir);

      if (err && err.killed) {
        return res.status(408).json({
          type: "timeout",
          message: "Time limit exceeded (possible infinite loop)."
        });
      }

      if (stderr) {
        return res.status(400).json({
          type: "error",
          message: stderr
        });
      }

      return res.json({
        type: "success",
        output: stdout
      });
    });

  } catch (e) {
    await safeRemove(jobDir);
    return res.status(500).json({
      type: "system_error",
      message: "Internal compiler failure"
    });
  }
});

app.listen(5000, () => console.log("Compiler API running on port 5000"));
