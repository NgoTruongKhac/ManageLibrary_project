import mongoose, { Schema } from "mongoose";
import { type } from "os";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleUnsigned: {
      type: String,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      require: true,
    },
    publicationYear: {
      type: Number,
    },
    stock: {
      type: Number,
      default: 20,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        userId: {
          type: String,
          required: true,
        },
        userName: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    ebook: {
      type: String,
    },
  },

  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
