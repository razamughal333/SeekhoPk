const mongoose = require('mongoose');
const dns = require('dns');

// Force Node's own DNS resolver to use Google DNS.
// Fixes "querySrv ECONNREFUSED" on Windows machines where antivirus/firewall
// software interferes with SRV record lookups even though normal browsing works fine.
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
