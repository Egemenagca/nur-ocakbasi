// --- setup.js (PROFESYONEL KURULUM DOSYASI) ---
const mongoose = require("mongoose");
require("dotenv").config();

// Ürün Şeması (Server.js ile aynı olmalı)
const Product = mongoose.model("Product", new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    imageUrl: String
}));

// Fotoğraflı Menü Listesi
const menuItems = [
    // PORSİYONLAR
    { name: "Pirzola", price: 500, category: "Porsiyonlar", desc: "Kuzu pirzola, özel marine edilmiş", imageUrl: "https://images.unsplash.com/photo-1544025162-d76690b6d015?auto=format&fit=crop&w=800&q=80" },
    { name: "Adana Kebap", price: 450, category: "Porsiyonlar", desc: "Zırh kıyma acılı", imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80" },
    { name: "Urfa Kebap", price: 450, category: "Porsiyonlar", desc: "Zırh kıyma acısız", imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80" },
    { name: "Ciğer Şiş", price: 450, category: "Porsiyonlar", desc: "Taze kuzu ciğer şiş", imageUrl: "https://images.unsplash.com/photo-1676300185290-735f47d87f73?auto=format&fit=crop&w=800&q=80" },
    { name: "Kuşbaşı", price: 450, category: "Porsiyonlar", desc: "Yumuşak kuzu kuşbaşı", imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80" },
    { name: "Kanat", price: 250, category: "Porsiyonlar", desc: "Soslu tavuk kanat", imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80" },
    { name: "Tavuk Şiş", price: 250, category: "Porsiyonlar", desc: "Tavuk göğüs şiş", imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80" },
    { name: "Patlıcanlı Kebap", price: 250, category: "Porsiyonlar", desc: "Balcan kebabı", imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" },
    { name: "Karışık Izgara", price: 600, category: "Porsiyonlar", desc: "Karışık et tabağı", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" },

    // DÜRÜMLER
    { name: "Adana Dürüm", price: 200, category: "Dürümler", desc: "Acılı dürüm", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80" },
    { name: "Urfa Dürüm", price: 200, category: "Dürümler", desc: "Acısız dürüm", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80" },
    { name: "Tavuk Dürüm", price: 100, category: "Dürümler", desc: "Tavuk şiş dürüm", imageUrl: "https://images.unsplash.com/photo-1561651881-d3f87a536531?auto=format&fit=crop&w=800&q=80" },

    // DÖNER
    { name: "Et Döner", price: 160, category: "Döner", desc: "Yaprak et döner", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
    { name: "Tavuk Döner Dürüm", price: 80, category: "Döner", desc: "Klasik tavuk döner", imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80" },
    { name: "Köfte Ekmek", price: 70, category: "Döner", desc: "Izgara köfte ekmek", imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80" },
    { name: "Çorba", price: 80, category: "Döner", desc: "Mercimek Çorbası", imageUrl: "https://images.unsplash.com/photo-1547592166-23acbe34071b?auto=format&fit=crop&w=800&q=80" },

    // ATIŞTIRMALIK
    { name: "Kızartma Tabağı", price: 100, category: "Atıştırmalık", desc: "Patates kızartması", imageUrl: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?auto=format&fit=crop&w=800&q=80" },
    { name: "Salata", price: 100, category: "Atıştırmalık", desc: "Mevsim salata", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },

    // İÇECEKLER
    { name: "Ayran", price: 20, category: "İçecekler", desc: "Bol köpüklü", imageUrl: "https://images.unsplash.com/photo-1625120667752-6663df85e510?auto=format&fit=crop&w=800&q=80" },
    { name: "Kutu Cola", price: 50, category: "İçecekler", desc: "Soğuk", imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80" },
    { name: "Şalgam", price: 25, category: "İçecekler", desc: "Acılı/Acısız", imageUrl: "https://images.unsplash.com/photo-1625120667752-6663df85e510?auto=format&fit=crop&w=800&q=80" },
    { name: "Su", price: 10, category: "İçecekler", desc: "", imageUrl: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔌 Veritabanına bağlandı.");

        console.log("🗑️  Eski veriler siliniyor...");
        await Product.deleteMany({});

        console.log("🌱 Yeni fotoğraflı menü ekleniyor...");
        await Product.insertMany(menuItems);

        console.log("✅ İŞLEM BAŞARILI! Menü kuruldu.");
        process.exit();
    } catch (error) {
        console.error("❌ Hata:", error);
        process.exit(1);
    }
}

seed();