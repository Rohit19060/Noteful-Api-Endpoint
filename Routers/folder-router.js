const path = require("path");
const express = require("express");
const xss = require("xss");
const FolderService = require("../src/Folders/folders-service");

const folderRouter = express.Router();
const jsonParser = express.json();

const sanitizeFolder = (folder) => ({
  ...folder,
  name: xss(folder.name),
});

folderRouter
  .route("/")
  .get((req, res, next) => {
    FolderService.getAllFolders(req.app.get("db")).then((Folders) => {
      res.json(Folders.map(sanitizeFolder));
    });
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const nF = { name };

    for (const [key, value] of Object.entries(nF)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}'` },
        });
      }
    }

    FolderService.insertFolder(req.app.get("db"), nF)
      .then((folder) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${folder.id}`))
          .json(sanitizeFolder(folder));
      })
      .catch(next);
  });

folderRouter
  .route("/:folder_id")
  .all((req, res, next) => {
    FolderService.getById(req.app.get("db"), req.params.folder_id)
      .then((folder) => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `Folder Not found` },
          });
        }
        res.folder = folder;
        console.log(res.folder);
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(sanitizeFolder(res.folder));
  })
  .patch(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const folderU = { name };

    if (!name) {
      return res.status(400).json({
        error: {
          message: `Request body must contain a 'name'`,
        },
      });
    }

    FolderService.updateFolder(req.app.get("db"), req.params.folder_id, folderU)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    FolderService.deleteFolder(req.app.get("db"), req.params.folder_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = folderRouter;
