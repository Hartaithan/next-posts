import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
  const file: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject({ error: err });
      resolve(files.file);
    });
  });
  if (file.error) {
    return res
      .status(400)
      .json({ message: "Error parsing image formdata", error: file.error });
  }
  try {
    const result = await cloudinary.uploader.upload(file.filepath);
    return res.status(201).send({
      message: "Image successfully uploaded",
      image_url: result.secure_url,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error uploading image", error: error });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return uploadImage(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
