import Comment from "../../../../db/models/Comment";
import Place from "../../../../db/models/Place";
import dbConnect from "../../../../db/Connect";
export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const places = await Place.findById(id).populate("comments");
    // console.log(places);
    if (!places && !id) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json({ place: places });
  }
  if (request.method === "PUT") {
    try {
      console.log(`request-body:${request.body}`);
      await Place.findByIdAndUpdate(id, request.body);
      response.status(200).json({ status: `Place ${id} updated!` });
    } catch (error) {
      console.log(error);
    }
  }
}
