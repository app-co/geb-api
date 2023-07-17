"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelationshipController = void 0;

var _factories = require("../../service/factories");

var _zod = require("zod");

class RelationshipController {
  async create(req, res) {
    const scheme = _zod.z.object({
      situation: _zod.z.boolean().default(false),
      membro_id: _zod.z.string(),
      ponts: _zod.z.number(),
      type: _zod.z.enum(['B2B', 'CONSUMO_IN', 'CONSUMO_OUT', 'APADRINAHMENTO', 'INDICATION', 'DONATE', 'INVIT']).default('CONSUMO_OUT')
    });

    const {
      id
    } = req.user;
    const data = scheme.parse(req.body);
    const {
      objto
    } = req.body;
    const dt = { ...data,
      fk_user_id: id,
      objto
    };

    try {
      const make = (0, _factories.makeRelationship)();
      const create = await make.create(dt);
      return res.json(create);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }

  async update(req, res) {
    const scheme = _zod.z.object({
      id: _zod.z.string(),
      situation: _zod.z.boolean(),
      ponts: _zod.z.number(),
      type: _zod.z.enum(['B2B', 'CONSUMO_IN', 'CONSUMO_OUT', 'APADRINAHMENTO', 'INDICATION', 'DONATE', 'INVIT']).default('CONSUMO_OUT')
    });

    const data = scheme.parse(req.body);
    const {
      id
    } = req.user;
    const dt = { ...data,
      membro_id: id
    };

    try {
      const make = (0, _factories.makeRelationship)();
      const create = await make.update(dt);
      return res.json(create);
    } catch (error) {
      return res.send(error);
    }
  }

  async listAll(req, res) {
    try {
      const make = (0, _factories.makeRelationship)();
      const create = await make.listAll();
      return res.json(create);
    } catch (error) {
      return res.send(error);
    }
  }

  async listByUserId(req, res) {
    try {
      const make = (0, _factories.makeRelationship)();
      const {
        id
      } = req.user;
      const create = await make.listByUserId(id);
      return res.json(create);
    } catch (error) {
      return res.send(error);
    }
  }

  async listByMembro(req, res) {
    const scheme = _zod.z.object({
      membro_id: _zod.z.string()
    });

    const {
      membro_id
    } = scheme.parse(req.params);

    try {
      const make = (0, _factories.makeRelationship)();
      const create = await make.listByMembro(membro_id);
      return res.json(create);
    } catch (error) {
      return res.send(error);
    }
  }

  async delete(req, res) {
    const scheme = _zod.z.object({
      id: _zod.z.string()
    });

    const {
      id
    } = scheme.parse(req.params);

    try {
      const make = (0, _factories.makeRelationship)();
      const create = await make.delete(id);
      return res.json(create);
    } catch (error) {
      return res.send(error);
    }
  }

  async data(req, res) {
    try {
      const make = (0, _factories.makeRelationship)();
      const create = await make.data();
      return res.json(create);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }

}

exports.RelationshipController = RelationshipController;