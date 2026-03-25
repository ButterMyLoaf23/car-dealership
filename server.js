import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import Path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./src/models/setup.js";
import authRoutes from "./src/controllers/authRoutes.js";
import dashboard from "./src/controllers/dashboard.js";
import vehicles from "./src/controllers/vehicles.js";
import { definedUser } from "./src/middleware/global.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "dev";
const PORT = process.env.PORT || 3000;

const app = express();

// This will be to serve my static files
app.use(express.static(Path.join(__dirname, "public")));

// this sets my EJS
app.set("view engine", "ejs");

// Tells express where my views are
app.set("views", Path.join(__dirname, "src", "views"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb"}));

// This is my session info, this will make it so my server doesn't save unless a changed is made, and it doesn't initialize my server unless a user logs on
app.use(session({
    secret: "secret-key", resave: false, saveUninitialized: false
}));

//this is for my definedUser middleware
app.use(definedUser);

app.get ("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// this is for my authRoutes route
app.use("/", authRoutes);

// this is for the dashboard route
app.use("/", dashboard);

// this is for the vehicle route
app.use("/", vehicles);

app.use((req, res, next) => {
    res.status(404).render("errors/404", {
        title: "Page Not Found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).render("errors/500", {
        title: "Server Error",
        error: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    });
});

testConnection();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});