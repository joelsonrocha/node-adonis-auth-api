import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class PostsController {
  public async index(ctx: HttpContextContract) {
    return Post.all();
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate();
    const data = request.only(["title", "content"]);

    const post = Post.create(data);

    return post;
  }

  public async update({ auth, params, request }: HttpContextContract) {
    const data = request.only(["title", "content"]);

    const post = await Post.findOrFail(params.id);
    post.merge(data);
    await post.save();
    return post;
  }

  public async view({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);
    return post;
  }

  public async delete({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate();
    const post = await Post.findOrFail(params.id);
    await post.delete();
  }
}
