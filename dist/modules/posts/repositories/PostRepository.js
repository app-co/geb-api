"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostRepository = void 0;

var _client = require(".prisma/client");

class PostRepository {
  prisma() {
    const {
      post
    } = new _client.PrismaClient();
    return post;
  }

  async create(data) {
    const {
      post
    } = new _client.PrismaClient();
    const create = await post.create({
      data: {
        image: data.image,
        user_id: data.user_id,
        description: data.description
      }
    });
    return create;
  }

  async findById(id) {
    const find = await this.prisma().findUnique({
      where: {
        id
      }
    });
    return find;
  }

  async listAllPost() {
    const {
      post
    } = new _client.PrismaClient();
    const find = await post.findMany({
      include: {
        user: true
      }
    });
    return find;
  }

}

exports.PostRepository = PostRepository;