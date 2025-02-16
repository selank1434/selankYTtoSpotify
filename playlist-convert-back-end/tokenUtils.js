const crypto = require('crypto');

const encryptToken = (token, encryptionKey) => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(encryptionKey, 'hex'); 
  const iv = crypto.randomBytes(16); 

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(token, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
};

const decryptToken = (encryptedToken, encryptionKey) => {
  const [ivHex, encrypted] = encryptedToken.split(':');
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(encryptionKey, 'hex'); 
  const iv = Buffer.from(ivHex, 'hex'); 
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
};

module.exports = {
  encryptToken,
  decryptToken,
};
