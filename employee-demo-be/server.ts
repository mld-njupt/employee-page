import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import employeeRoutes from "./routes/employeeRoutes";
import experienceRoutes from "./routes/experienceRoutes";
import educationRoutes from "./routes/educationRoutes";
import { camelCaseResponseMiddleware } from "./middlewares/camelCaseMiddleware";
import { snakeCaseRequestMiddleware } from "./middlewares/snakeCaseMiddleware"

const app = express();
app.use(cors());
app.use(bodyParser.json());
// 请求进来时，把 camelCase 转 snake_case
app.use(snakeCaseRequestMiddleware);

// 返回出去时，把 snake_case 转 camelCase
app.use(camelCaseResponseMiddleware);

// 员工相关
app.use("/api/employees", employeeRoutes);

// 工作经历
app.use("/api/employees/:id/experience", experienceRoutes);

// 教育经历
app.use("/api/employees/:id/education", educationRoutes);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
