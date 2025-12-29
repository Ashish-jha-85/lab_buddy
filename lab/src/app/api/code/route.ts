import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const ENGINE = "http://localhost:5000/run";

export async function POST(req: NextRequest) {
  try {
    const { code, input, language } = await req.json();

    const response = await axios.post(ENGINE, {
      language,
      code,
      input: input || "",
    });

    return NextResponse.json({
      stdout: response.data.output,
      stderr: "",
      compile_output: "",
      time: "0.01 sec",
      memory: "12 MB",
      status: { description: "Accepted" },
    });
  } catch (err: any) {
    // Judge returned compile/runtime error / timeout
    if (err.response) {
      const data = err.response.data;

      if (data.type === "error") {
        return NextResponse.json({
          stdout: "",
          stderr: data.message,
          compile_output: "",
          time: "0.00 sec",
          memory: "0 MB",
          status: { description: "Compilation Error" },
        });
      }

      if (data.type === "timeout") {
        return NextResponse.json({
          stdout: "",
          stderr: data.message,
          compile_output: "",
          time: "5.00 sec",
          memory: "128 MB",
          status: { description: "Time Limit Exceeded" },
        });
      }

      return NextResponse.json({
        stdout: "",
        stderr: data.message || "System Error",
        compile_output: "",
        time: "0.00 sec",
        memory: "0 MB",
        status: { description: "System Error" },
      });
    }

    // Server crash / network error
    return NextResponse.json(
      {
        stdout: "",
        stderr: "Compiler server not reachable",
        compile_output: "",
        time: "0.00 sec",
        memory: "0 MB",
        status: { description: "Server Error" },
      },
      { status: 500 }
    );
  }
}
