'use strict';

/**
 * Summary.js controller
 *
 * @description: A set of functions called "actions" for managing `Summary`.
 */

module.exports = {

  /**
   * Retrieve summary records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.summary.search(ctx.query);
    } else {
      return strapi.services.summary.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a summary record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.summary.fetch(ctx.params);
  },

  /**
   * Count summary records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.summary.count(ctx.query);
  },

  /**
   * Create a/an summary record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.summary.add(ctx.request.body);
  },

  /**
   * Update a/an summary record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.summary.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an summary record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.summary.remove(ctx.params);
  }
};
