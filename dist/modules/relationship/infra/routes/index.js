"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relationship = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _relationshipController = require("../controllers/relationship-controller");

const relationship = (0, _express.Router)();
exports.relationship = relationship;
const controler = new _relationshipController.RelationshipController();
relationship.use(_Auth.Auth);
relationship.put('/relation-update', controler.update);
relationship.post('/relation-create', controler.create);
relationship.delete('/relation-delete', controler.delete);
relationship.get('/relation', controler.listAll);
relationship.get('/relation/:membro_id', controler.listByMembro);
relationship.get('/relation/selfe', controler.listByUserId);
relationship.post('/relation/data', controler.data);