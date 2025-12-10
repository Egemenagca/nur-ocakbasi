const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// --- Veritabanı Bağlantısı ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Veritabanı Bağlandı"))
  .catch((err) => console.error("❌ Hata:", err));

// --- Ürün Modeli ---
const Product = mongoose.model("Product", new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    imageUrl: String
}));

// --- Ayarlar ---
app.use(cors());
app.use(express.json());

// DÜZELTME BURADA: path.join kullanarak yolları garantiye aldık
app.use(express.static(path.join(__dirname, "public"))); 
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

// --- Resim Yükleme Ayarı ---
const upload = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "uploads/"),
        filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
    })
});

// --- ROTALAR ---

// 1. Ana Sayfa (Müşteri)
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// 2. Admin Sayfası
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "public", "admin.html")));

// 3. API: Ürün Ekleme
app.post("/api/products", upload.single("image"), async (req, res) => {
    try {
        // Windows'ta ters slash (\) sorununu önlemek için replace yapıyoruz
        let imageUrl = "";
        if (req.file) {
            imageUrl = "/uploads/" + req.file.filename;
        }
        
        const product = await Product.create({ ...req.body, imageUrl });
        res.json(product);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 4. API: Ürünleri Getirme
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 5. API: Ürün Güncelleme
app.put("/api/products/:id", upload.single("image"), async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        let updateData = { name, price, category, description };

        if (req.file) {
            updateData.imageUrl = "/uploads/" + req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedProduct);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 6. API: Ürün Silme
app.delete("/api/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => console.log(`🚀 Sunucu Çalışıyor: http://localhost:${PORT}`));