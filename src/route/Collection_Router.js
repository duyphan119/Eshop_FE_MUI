const Collection_Controller = require("../controllers/Collection_Controller");
const { getUser } = require("../middleware/Auth_Middleware");

const router = require("express").Router();

router.get("/slug/:slug", getUser, Collection_Controller.getBySlug);
router.get("/:id", getUser, Collection_Controller.getById);
router.get("/", getUser, Collection_Controller.getAll);
router.post("/", Collection_Controller.create);
router.put("/", Collection_Controller.update);
router.delete("/:id", Collection_Controller._delete);

module.exports = router;
