const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const uploadToGcs = require("../modules/article");
const { get } = require("../routes/article");

const createArticle = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const banner = req.file;

  if (!title) {
    return res.status(400).json({
      message: "Title is required.",
    });
  }

  if (!content) {
    return res.status(400).json({
      message: "Content is required.",
    });
  }

  if (!banner) {
    return res.status(400).json({
      message: "Banner image is required.",
    });
  }

  if (!banner) {
    return res.status(400).json({
      message: "Title is required.",
    });
  }

  try {
    const publicUrl = await uploadToGcs.uploadToGcs(banner);

    const sendData = await prisma.articles.create({
      data: {
        title: title,
        banner: publicUrl,
        content: content,
      },
    });

    return res.status(201).json({
      message: "Article successfully saved",
      sendData,
    });
  } catch (error) {
    console.error("Error during uploading:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during uploading" });
  }
};

const getArticles = async (req, res) => {
  try {
    const allArticles = await prisma.articles.findMany();
    return res.status(200).json({
      message: "Successfully retreived data",
      allArticles,
    });
  } catch (error) {
    console.error("Error during uploading:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during retreived data" });
  }
};

const detailArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);

  try {
    const detail = await prisma.articles.findUnique({
      where: {
        id: articleId,
      },
    });

    return res.status(201).json({
      message: "Successfully retreived data",
      detail,
    });
  } catch (error) {
    console.error("Error during uploading:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during retreived data" });
  }
};

module.exports = {
  createArticle,
  getArticles,
  detailArticle,
};
