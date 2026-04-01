import pool from "./db.js";
// this is my featured vehicles for my homepage
export const getFeaturedVehicles = async () => {
    const result = await pool.query ("SELECT * FROM vehicles ORDER BY id DESC LIMIT 6");
    return result.rows;
}

// sort function for my vehicles page
export const getAllVehicles = async (sort) => {
    let query = "SELECT * FROM vehicles";

    if (sort === "price-asc") {
        query += "ORDER BY price ASC";
    }
    if (sort === "price-desc") {
        query += "ORDER BY price DESC";
    }
    if (sort === "year-asc") {
        query += "ORDER BY year ASC";
    }
    if (sort === "year-desc") {
        query += "ORDER BY year DESC";
    }

    const result = await pool.query(query);
    return result.rows;
}

export const getVehicleById = async (id) => {
    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [id]);
    return result.rows[0];
}   

export const createVehicle = async (vehicle) => {
    const {year, title, price, description, image_url} = vehicle;

    await pool.query("INSERT INTO vehicles (year, title, price, description, image_url) VALUES ($1, $2, $3, $4, $5)", [year, title, price, description, image_url]);
};

export const getReviewByVehicleId = async (id) => {
    const result = await pool.query("SELECT reviews.*, users.name FROM reviews JOIN users ON reviews.user_id = users.id WHERE vehicle_id = $1", [id]);
    return result.rows;
}

export const deleteVehicle = async (id) => {
    await pool.query("DELETE FROM vehicles WHERE id = $1", [id]);
};


export const updateVehicle = async (id, vehicle) => {
    const {title, price, description, year} = vehicle;

    await pool.query("UPDATE vehicles SET title = $1, price = $2, description = $3, year = $4 WHERE id = $5", [title, price, description, year, id]);
};