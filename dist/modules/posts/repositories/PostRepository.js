"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostRepository = void 0;

var _client = require(".prisma/client");

/* eslint-disable import/no-extraneous-dependencies */
class PostRepository {
  prisma() {
    const {
      post
    } = new _client.PrismaClient();
    return post;
  }

  async create(data, like) {
    const {
      post
    } = new _client.PrismaClient();
    const create = await post.create({
      data: {
        image: data.image,
        description: data.description,
        fk_id_user: data.fk_id_user,
        like: {
          create: {
            like,
            user_id: data.fk_id_user
          }
        }
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
        like: true
      }
    });
    return find;
  }

  async createLike(user_id, fk_id_post) {
    const prisma = new _client.PrismaClient();
    const lk = await prisma.like.create({
      data: {
        user_id,
        fk_id_post
      }
    });
    return lk;
  }

  async findLikeByUserId(id) {
    const prisma = new _client.PrismaClient();
    const like = await prisma.like.findFirst({
      where: {
        user_id: id
      }
    });
    return like;
  }

}

exports.PostRepository = PostRepository;