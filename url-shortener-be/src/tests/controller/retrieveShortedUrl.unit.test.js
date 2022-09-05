import prisma from "../../../prisma/index.js";
import getController from "../../controllers/retrieveShortenedUrl.js";

describe("Test if the get shortened URL controllers provide the correct output", () => {
  const seedTestData = [
    {
      originalUrl: "www.testGet1.com",
      shortUrl: "www.shortGet1.com",
    },
    {
      originalUrl: "www.testGet2.com",
      shortUrl: "www.shortGet2.com",
    },
    {
      originalUrl: "www.testGet3.com",
      shortUrl: "www.shortGet3.com",
    },
  ];

  beforeAll(async () => {
    await prisma.url.createMany({ data: seedTestData });
  });

  afterAll(async () => {
    await prisma.url.deleteMany({});
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
  };

  test("check if returns the correct url with valid input", async () => {
    const mockReq = {
      params: { shortUrl: "www.shortGet3.com" },
    };

    const res = mockResponse();
    await getController.getUrl(mockReq, res);

    expect(res.redirect).toHaveBeenCalledWith("www.testGet3.com");
  });

  test("check if returns error for invalid input", async () => {
    const mockReq = {
      params: { shortUrl: "www.unknown.com" },
    };

    const res = mockResponse();
    await getController.getUrl(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ data: "no such address" });
  });
});
