const FolderService = {
  getAllFolders(knex) {
    return knex.select("*").from("folders").orderBy("id", "asc");
  },

  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into("folders")
      .returning("*")
      .then((rows) => rows[0]);
  },
  getById(knex, id) {
    return knex.from("folders").select("*").where("id", id).first();
  },
  deleteFolder(knex, id) {
    return knex.from("folders").where({ id }).delete();
  },
  updateFolder(knex, id, newFolderFields) {
    return knex.from("folders").where({ id }).update(newFolderFields);
  },
};

module.exports = FolderService;
