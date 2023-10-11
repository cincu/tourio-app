import Comment from "../../../../db/models/Comment";
import dbConnect from "../../../../db/Connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "DELETE") {
    console.log(id);
    await Comment.findByIdAndDelete(id);
    response.status(200).json({ status: `Comment ${id} was deleted.` });
  }
}
