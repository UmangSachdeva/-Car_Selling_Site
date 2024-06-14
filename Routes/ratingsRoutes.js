const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");
const ratingsController = require("../Controller/ratingsController");

router.route("/").get(ratingsController.getReviewAll);

router
  .route("/:id")
  .get(ratingsController.getReview)
  .patch(ratingsController.updateReview)
  .post(
    authController.verifyMe,
    // ratingsController.setPostUserIds,
    ratingsController.addReview
  );

module.exports = router;
