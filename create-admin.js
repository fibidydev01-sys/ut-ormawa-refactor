const data = {
  email: "superadmin@ormawautsby.com",
  password: "SuperAdmin123!",
  name: "Super Admin Utama",
  role: "SUPER_ADMIN"
};

console.log("Membuat akun super admin...");

fetch("http://localhost:3000/api/create-user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(async (response) => {
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result?.message || "Gagal membuat akun admin.");
    }
    console.log("Akun berhasil dibuat:", result);
  })
  .catch((error) => {
    console.error("Error:", error.message || error);
    process.exit(1);
  });
