"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllPost = void 0;

var _tsyringe = require("tsyringe");

var _IPostRepositoty = require("../repositories/IPostRepositoty");

var _dec, _dec2, _dec3, _dec4, _class;

let ListAllPost = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaPost')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPostRepositoty.IPostsRepository === "undefined" ? Object : _IPostRepositoty.IPostsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAllPost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute() {
    const find = await this.postRepository.listAllPost();
    const posts = find.map(h => ({ ...h,
      url_image: `${process.env.AWS_URL}/posts/${h.image}`
    }));
    posts.reverse();
    console.log(posts);
    return posts;
  }

}) || _class) || _class) || _class) || _class);
exports.ListAllPost = ListAllPost;