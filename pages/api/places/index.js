import dbConnect from "../../../db/Connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  try {
    if (request.method === "GET") {
      const places = await Place.find();
      return response.status(200).json(places);
    }
    if (request.method === "POST") {
      const newPlaces = await Place.create(request.body);
      return response.status(200).json(newPlaces);
    }
  } catch (error) {
    console.log(error);
    response.status(404).json({ message: "not found" });
  }
}
