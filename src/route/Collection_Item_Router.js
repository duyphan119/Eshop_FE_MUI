const Collection_Item_Controller = require("../controllers/Collection_Item_Controller");

const router = require("express").Router();

router.get(
  "/collection/:collection_id",
  Collection_Item_Controller.getAllByCollectionId
);
router.get("/:id", Collection_Item_Controller.getById);
router.post("/", Collection_Item_Controller.create);
router.delete("/:id", Collection_Item_Controller._delete);

module.exports = router;
