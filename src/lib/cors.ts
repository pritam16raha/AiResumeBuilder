// lib/cors.ts
import Cors from "cors";

// You can change origin to a specific domain like "https://pritamraha.in"
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "*", // Or use exact domain instead of "*"
});

export default cors;
