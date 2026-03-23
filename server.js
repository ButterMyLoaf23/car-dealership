import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import Path from "path";
import { fileURLToPath } from "url";

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
app.set("views", Path.join(__dirname, "views"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb"}));

// This is my session info, this will make it so my server doesn't save unless a changed is made, and it doesn't initialize my server unless a user logs on
app.use(session({
    secret: "secret-key", resave: false, saveUninitialized: false
}));

app.get ("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.use((req, res, next) => {
    const status = err.status || 500;
    const template = status === 404 ? "404" : "500";

    res.status(status).render(template, {
        title: status === 404 ? "Page not found" : "Server error", error: err.message, stack: NODE_ENV === "dev" ? err.stack : null
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});