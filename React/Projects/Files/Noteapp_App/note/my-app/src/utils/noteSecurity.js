
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64(bytes) {
  let binary = "";
  const chunkSize = 8192;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, i + chunkSize)
    );
  }

  return btoa(binary);
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), (char) =>
    char.charCodeAt(0)
  );
}

async function deriveKey(password, salt) {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 310000,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptNoteData(title, content, password) {
  if (!password || password.length < 4) {
    throw new Error("Password must contain at least 4 characters.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(password, salt);

  const data = JSON.stringify({
    title: title || "",
    content: content || "",
  });

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(data)
  );

  return {
    encryptedData: toBase64(new Uint8Array(encrypted)),
    encryptionSalt: toBase64(salt),
    encryptionIv: toBase64(iv),
  };
}

export async function decryptNoteData(
  encryptedData,
  encryptionSalt,
  encryptionIv,
  password
) {
  if (!password) {
    throw new Error("Password is required.");
  }

  const salt = fromBase64(encryptionSalt);
  const iv = fromBase64(encryptionIv);
  const encrypted = fromBase64(encryptedData);

  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encrypted
  );

  return JSON.parse(decoder.decode(decrypted));
}
