import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("new new new enw all data");
});

router.get("/:shopId", (req, res) => {
  const { shopId } = req.params;

  console.log({
    message: "Shop fetched",
    data: { _id: shopId },
    status: 200,
    success: true,
  });

  return res.status(200).json({
    message: "Shop fetched",
    data: {
      _id: shopId,
      name: `Shop ${shopId}`,
      description: `Description for Shop ${shopId}`,
    },
    status: 200,
    success: true,
  });
});

export default router;
