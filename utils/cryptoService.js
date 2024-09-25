export const generateKeyPair = async () => {
  const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), // 65537
      hash: "SHA-256",
    },
    true, // Whether the key is extractable
    ["sign", "verify"]
  );

  return { publicKey, privateKey };
};

export const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const signVote = async (voteData, privateKey) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(voteData));

  // Sign the data
  const signature = await window.crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    data
  );

  return { voteData, signature: arrayBufferToBase64(signature) };
};

export const verifyVote = async (signedVote, publicKey) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(signedVote.voteData));

  // Verify the signature
  const verified = await window.crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    signedVote.signature,
    data,
    publicKey // Pass the public key here
  );

  return verified;
};
