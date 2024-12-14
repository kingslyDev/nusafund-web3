import fs from "fs";
import path from "path";
import cbor from "cbor";
import sharp from "sharp";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const imagePath = path.resolve(
  __dirname,
  "../fundraising_icp_frontend/src/assets/bansos.png"
);

(async () => {
  try {
    // Compress and resize the image
    const compressedBuffer = await sharp(imagePath)
      .resize({ width: 500 }) // Adjust size to reduce payload
      .toBuffer();

    const imageBlob = Array.from(compressedBuffer);
    console.log("Compressed Image Size:", compressedBuffer.length);

    // Prepare the body payload
    const body = {
      title: "Save the Rainforest",
      description: "Help us protect the rainforest.",
      goal_amount: 1000,
      start_date: "2024-12-14",
      end_date: "2024-12-15",
      image: imageBlob,
    };

    const cborEncoded = cbor.encode(body);
    console.log("CBOR Payload Size:", cborEncoded.length);

    // Send the request
    const response = await fetch(
      "http://127.0.0.1:4943/api/v2/canister/be2us-64aaa-aaaaa-qaabq-cai/call",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/cbor",
        },
        body: cborEncoded,
      }
    );

    // Log raw response
    const responseText = await response.text();
    console.log("Raw Response:", responseText);

    // Check response status
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    // Decode the CBOR response
    const decoded = cbor.decodeAllSync(Buffer.from(responseText, "binary"));
    console.log("Decoded Response:", decoded);
  } catch (err) {
    console.error("Error:", err.message || err);
  }
})();
